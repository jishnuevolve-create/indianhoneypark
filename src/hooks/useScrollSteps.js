import { useCallback, useEffect, useRef, useState } from 'react';
import { getScrollTrackProgress } from '../utils/heroScroll';
import { scrollToPosition } from '../utils/smoothScroll';

// By default, pinning needs a screen wide AND tall enough to show all steps at once.
const DEFAULT_PINNED_QUERY = '(min-width: 768px) and (min-height: 680px)';

/*
  Works out which step should be active while the visitor scrolls.
  Used by the homepage hero (one jar per step) and the "How to Order" section.

  - "Pinned" mode (screens matching pinnedQuery): the section stays on screen while the
    visitor scrolls through a tall wrapper. How far they have scrolled through it (0 → 1)
    decides the active step. After the last step, the page scrolls on normally.
  - Otherwise the steps are stacked, so a step becomes active once it reaches
    the middle of the screen (only when step refs are attached).

  Returns refs to attach to the wrapper and to each step, the current state,
  and scrollToStep(index) to jump to a step (e.g. when a dot is clicked).
*/
export function useScrollSteps(stepCount, pinnedQuery = DEFAULT_PINNED_QUERY) {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [isPinned, setIsPinned] = useState(() => window.matchMedia(pinnedQuery).matches);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Switch between pinned and stacked mode when the screen size changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia(pinnedQuery);
    const handleChange = () => setIsPinned(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [pinnedQuery]);

  useEffect(() => {
    let frameId = null;

    function updateActiveStep() {
      frameId = null;
      const container = containerRef.current;
      if (!container) return;

      if (isPinned) {
        const newProgress = getScrollTrackProgress(container);
        // Rounded so React only updates when the change is visible (fewer re-renders while scrolling).
        setProgress(Math.round(newProgress * 200) / 200);
        setActiveStep(Math.min(stepCount - 1, Math.floor(newProgress * stepCount)));
        return;
      }

      // Stacked: the last step whose top has passed the middle of the screen is active.
      if (stepRefs.current.length === 0) return;
      const activationLine = window.innerHeight * 0.5;
      let newActiveStep = 0;
      stepRefs.current.forEach((step, index) => {
        if (step && step.getBoundingClientRect().top < activationLine) newActiveStep = index;
      });
      setActiveStep(newActiveStep);
    }

    // Only recalculate once per animation frame, however fast the visitor scrolls.
    function scheduleUpdate() {
      if (frameId === null) frameId = requestAnimationFrame(updateActiveStep);
    }

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isPinned, stepCount]);

  // Smoothly scrolls the page to the middle of a step's scroll range (pinned mode only).
  const scrollToStep = useCallback(
    (index) => {
      const container = containerRef.current;
      if (!container || !isPinned) return;
      const { top, height } = container.getBoundingClientRect();
      const pinnedPanelHeight = container.firstElementChild?.offsetHeight || window.innerHeight;
      const scrollableDistance = height - pinnedPanelHeight;
      const containerTop = window.scrollY + top;
      scrollToPosition(containerTop + ((index + 0.5) / stepCount) * scrollableDistance);
    },
    [isPinned, stepCount],
  );

  return { containerRef, stepRefs, isPinned, activeStep, progress, scrollToStep };
}
