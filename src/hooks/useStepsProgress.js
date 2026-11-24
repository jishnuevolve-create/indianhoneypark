import { useEffect, useRef, useState } from 'react';

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

  - pinned = true: the section stays fixed on screen (sticky) while the page scrolls through
    its tall wrapper. Each part of the scroll moves to the next step; after the last step the
    section lets go and the page continues to the next section. Attach `sectionRef` to the
    tall wrapper.
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

  return { sectionRef, stepsRef, lineRef, activeStep };
}
