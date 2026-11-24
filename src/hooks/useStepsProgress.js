import { useEffect, useRef, useState } from 'react';
import { scrollToPosition } from '../utils/smoothScroll';

// Pinning needs a reasonably tall screen and is skipped for people who prefer less motion.
const PINNED_QUERY = '(min-height: 640px) and (prefers-reduced-motion: no-preference)';

// True when the "How to Order" section should pin to the screen while steps change.
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

/*
  Lights up steps one by one while the visitor scrolls.

  - pinned = true: the section stays fixed on screen (sticky) inside its tall wrapper
    (attach `sectionRef` to the wrapper). While it is fixed, every scroll gesture (mouse wheel,
    trackpad swipe, touch swipe, arrow / page keys) moves exactly ONE step. Scrolling down
    past the last step (or up past the first) lets go, and the page continues normally.
  - pinned = false: nothing is fixed; steps light up as the list moves up through the screen.
    Attach `stepsRef` to the list.

  - lineRef: attach to the progress line's fill; it is scaled 0 → 1 directly (no React re-render).
  - activeStep: which step is highlighted. React only re-renders when it changes.
*/
export function useStepsProgress(
  stepCount,
  { pinned = false, startAt = 0.8, distance = 0.45 } = {},
) {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Which step is highlighted, from the scroll position.
  useEffect(() => {
    let frameId = null;
    function update() {
      frameId = null;
      const viewportHeight = window.innerHeight;
      let progress;

      if (pinned) {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - viewportHeight);
        progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      } else {
        const list = stepsRef.current;
        if (!list) return;
        const raw =
          (viewportHeight * startAt - list.getBoundingClientRect().top) /
          (viewportHeight * distance);
        progress = Math.min(1, Math.max(0, raw));
      }

      // Pinned: step i sits at i/(n-1) of the pinned scroll. Unpinned: the steps share 0..1 evenly.
      const step = pinned
        ? Math.round(progress * (stepCount - 1))
        : Math.min(stepCount - 1, Math.floor(progress * stepCount));
      setActiveStep(step);
      if (lineRef.current && stepCount > 1) {
        const lineFill = pinned ? progress : Math.min(1, (progress * stepCount) / (stepCount - 1));
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

  // One scroll gesture = one step, while the section is pinned.
  useEffect(() => {
    if (!pinned || stepCount < 2) return undefined;

    const STEP_DURATION = 0.8; // seconds the page takes to glide to the next step
    const STEP_COOLDOWN = 1000; // ms during which extra wheel / swipe input is ignored
    let lastStepTime = 0;
    let lastWheelTime = 0;
    let targetStep = 0;
    let engaged = false;
    let touchStartY = null;
    let touchDone = false;

    function getRange() {
      const section = sectionRef.current;
      if (!section) return null;
      const rect = section.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      return { start, end: start + Math.max(1, rect.height - window.innerHeight) };
    }
    const positionOf = (range, step) =>
      range.start + ((range.end - range.start) * step) / (stepCount - 1);

    function moveTo(range, step) {
      targetStep = step;
      lastStepTime = performance.now();
      scrollToPosition(positionOf(range, step), { duration: STEP_DURATION });
    }

    // Returns true when the gesture was used by the pinned section (so the page must not scroll).
    function handleGesture(direction, isNewGesture) {
      const range = getRange();
      if (!range) return false;
      const y = window.scrollY;
      const now = performance.now();
      const inside = y >= range.start - 2 && y <= range.end + 2;
      if (!inside) {
        engaged = false;
        return false;
      }

      const animating = now - lastStepTime < STEP_COOLDOWN;
      const progress = (y - range.start) / (range.end - range.start);
      const currentStep = animating
        ? targetStep
        : Math.min(stepCount - 1, Math.max(0, Math.round(progress * (stepCount - 1))));

      // Just arrived (e.g. with scrolling momentum): settle on the first / last step first.
      if (!engaged) {
        engaged = true;
        const overshoot = window.innerHeight * 0.35;
        if (direction > 0 && y - range.start > 2 && y - range.start < overshoot) {
          moveTo(range, 0);
          return true;
        }
        if (direction < 0 && range.end - y > 2 && range.end - y < overshoot) {
          moveTo(range, stepCount - 1);
          return true;
        }
      }

      // At the first step going up, or the last step going down: let the page continue.
      if (direction < 0 && currentStep <= 0 && y <= range.start + 2) return false;
      if (direction > 0 && currentStep >= stepCount - 1 && y >= range.end - 2) return false;

      if (!animating && isNewGesture) {
        moveTo(range, Math.min(stepCount - 1, Math.max(0, currentStep + direction)));
      }
      return true;
    }

    function handleWheel(event) {
      if (event.ctrlKey || !event.deltaY) return;
      const now = performance.now();
      const gap = now - lastWheelTime;
      lastWheelTime = now;
      // A new swipe starts after a short pause (this ignores a trackpad's trailing momentum).
      const isNewGesture = gap > 70 || now - lastStepTime > 1500;
      if (handleGesture(Math.sign(event.deltaY), isNewGesture)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }

    function handleTouchStart(event) {
      touchStartY = event.touches[0].clientY;
      touchDone = false;
    }
    function handleTouchMove(event) {
      if (touchStartY === null) return;
      const distanceMoved = touchStartY - event.touches[0].clientY;
      const direction = Math.sign(distanceMoved);
      if (!direction) return;
      const swiped = !touchDone && Math.abs(distanceMoved) > 40;
      if (handleGesture(direction, swiped)) {
        if (swiped) touchDone = true;
        if (event.cancelable) event.preventDefault();
      }
    }

    function handleKeyDown(event) {
      const target = event.target;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        target.closest?.('input, textarea, select, button, a, [contenteditable]')
      ) {
        return;
      }
      let direction = 0;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') direction = 1;
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') direction = -1;
      else if (event.key === ' ') direction = event.shiftKey ? -1 : 1;
      if (!direction) return;
      if (handleGesture(direction, !event.repeat)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [pinned, stepCount]);

  return { sectionRef, stepsRef, lineRef, activeStep };
}
