import { useEffect, useRef, useState } from 'react';
import { pauseSmoothScroll, resumeSmoothScroll, scrollToPosition } from '../utils/smoothScroll';

// Holding the page needs a reasonably tall screen and is skipped for people who prefer less motion.
const PINNED_QUERY = '(min-height: 640px) and (prefers-reduced-motion: no-preference)';

// True when the "How to Order" section should hold the page while its steps change.
export function usePinnedSteps() {
  const [isPinned, setIsPinned] = useState(() => window.matchMedia(PINNED_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(PINNED_QUERY);
    function update() {
      setIsPinned(query.matches);
    }
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isPinned;
}

const STEP_COOLDOWN = 700; // ms after a step change (or after arriving) in which extra input is ignored
const GLIDE_SECONDS = 0.9; // how long the page takes to move on to the next / previous section

/*
  Lights up the steps of "How to Order".

  pinned = true  (the section is exactly one screen tall; attach `sectionRef` to it)
    1. Scrolling down, the page STOPS the moment the section fills the screen. It is held there:
       the page cannot scroll while the steps are going.
    2. Every scroll gesture (mouse wheel notch, trackpad swipe, touch swipe, arrow / page / space
       key) moves exactly one step.
    3. One more gesture after the last step releases the page, which glides on to the next section.
       Scrolling up works the same way in reverse (arriving from below starts at the last step).

  pinned = false (short screens / reduced motion): nothing is held; steps light up as the list
    moves up through the screen. Attach `stepsRef` to the list.

  lineRef: the progress line's fill (scaled 0 → 1 directly, no React re-render).
  activeStep: which step is highlighted.
*/
export function useStepsProgress(
  stepCount,
  { pinned = false, startAt = 0.8, distance = 0.45 } = {},
) {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Not held: steps light up as the list scrolls up through the screen.
  useEffect(() => {
    if (pinned) return undefined;
    let frameId = null;
    function update() {
      frameId = null;
      const list = stepsRef.current;
      if (!list) return;
      const viewportHeight = window.innerHeight;
      const raw =
        (viewportHeight * startAt - list.getBoundingClientRect().top) / (viewportHeight * distance);
      const progress = Math.min(1, Math.max(0, raw));
      setActiveStep(Math.min(stepCount - 1, Math.floor(progress * stepCount)));
      if (lineRef.current && stepCount > 1) {
        const lineFill = Math.min(1, (progress * stepCount) / (stepCount - 1));
        lineRef.current.style.transform = `scaleX(${lineFill})`;
      }
    }
    function scheduleUpdate() {
      if (frameId === null) frameId = requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [stepCount, pinned, startAt, distance]);

  // Held: the progress line follows the current step.
  useEffect(() => {
    if (pinned && lineRef.current && stepCount > 1) {
      lineRef.current.style.transform = `scaleX(${activeStep / (stepCount - 1)})`;
    }
  }, [pinned, activeStep, stepCount]);

  // Held: stop the page on the section and move one step per gesture.
  useEffect(() => {
    if (!pinned || stepCount < 2) return undefined;

    let locked = false;
    let step = 0;
    let busyUntil = 0;
    let lastY = window.scrollY;
    let lastWheelTime = 0;
    // After letting go, don't catch the page again until it has moved clear of the section.
    let disarmed = false;
    let touchStartY = null;
    let touchDone = false;

    const sectionTop = () => window.scrollY + sectionRef.current.getBoundingClientRect().top;

    function showStep(index) {
      step = index;
      setActiveStep(index);
    }

    // Stop the page exactly on the section and take over scrolling.
    function lock(startStep) {
      locked = true;
      showStep(startStep);
      busyUntil = performance.now() + STEP_COOLDOWN;
      scrollToPosition(sectionTop(), { immediate: true });
      pauseSmoothScroll();
    }

    // Give scrolling back and glide on to the next (direction 1) or previous (-1) section.
    function release(direction) {
      locked = false;
      disarmed = true;
      resumeSmoothScroll();
      busyUntil = performance.now() + STEP_COOLDOWN;
      const top = sectionTop();
      const target =
        direction > 0 ? top + sectionRef.current.offsetHeight : top - window.innerHeight * 0.6;
      scrollToPosition(target, { duration: GLIDE_SECONDS });
    }

    function handleGesture(direction) {
      if (performance.now() < busyUntil) return;
      const next = step + direction;
      if (next < 0 || next > stepCount - 1) {
        release(direction);
        return;
      }
      showStep(next);
      busyUntil = performance.now() + STEP_COOLDOWN;
    }

    // Catch the moment the page scrolls onto the section, and keep it there while locked.
    function handleScroll() {
      const y = window.scrollY;
      const top = sectionTop();
      if (locked) {
        if (Math.abs(y - top) > 1) window.scrollTo({ top, behavior: 'instant' });
        lastY = top;
        return;
      }
      if (disarmed) {
        if (Math.abs(y - top) > 80) disarmed = false;
        lastY = y;
        return;
      }
      // Ignore big jumps (scrollbar drag, links, Home / End): only normal scrolling is caught.
      const smallMove = Math.abs(y - lastY) < window.innerHeight * 1.2;
      if (smallMove && lastY < top - 0.5 && y >= top - 0.5) lock(0);
      else if (smallMove && lastY > top + 0.5 && y <= top + 0.5) lock(stepCount - 1);
      lastY = y;
    }

    function handleWheel(event) {
      if (!locked || event.ctrlKey || !event.deltaY) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const now = performance.now();
      const gap = now - lastWheelTime;
      lastWheelTime = now;
      // A new swipe starts after a short pause (this ignores a trackpad's trailing momentum).
      if (gap > 70) handleGesture(Math.sign(event.deltaY));
    }

    function handleTouchStart(event) {
      touchStartY = event.touches[0].clientY;
      touchDone = false;
    }
    function handleTouchMove(event) {
      if (!locked || touchStartY === null) return;
      if (event.cancelable) event.preventDefault();
      const moved = touchStartY - event.touches[0].clientY;
      if (!touchDone && Math.abs(moved) > 40) {
        touchDone = true;
        handleGesture(Math.sign(moved));
      }
    }

    function handleKeyDown(event) {
      if (!locked || event.altKey || event.ctrlKey || event.metaKey) return;
      let direction = 0;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') direction = 1;
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') direction = -1;
      else if (event.key === ' ') direction = event.shiftKey ? -1 : 1;
      else if (event.key === 'End' || event.key === 'Home')
        direction = event.key === 'End' ? 1 : -1;
      if (!direction) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!event.repeat) handleGesture(direction);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      if (locked) resumeSmoothScroll();
    };
  }, [pinned, stepCount]);

  return { sectionRef, stepsRef, lineRef, activeStep };
}
