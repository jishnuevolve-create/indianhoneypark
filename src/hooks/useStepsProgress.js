import { useEffect, useRef, useState } from 'react';

/*
  Lights up steps one by one as a list of steps moves up through the screen
  (the page scrolls normally — nothing is pinned).

  - stepsRef: attach to the list of steps.
  - lineRef: attach to the progress line's fill; it is scaled 0 → 1 directly
    (no React re-render), reaching each step as that step lights up.
  - activeStep: which step is highlighted. React only re-renders when it changes.

  Progress starts when the list's top reaches `startAt` of the screen height
  (0.8 = 80% down the screen) and completes after it moves another `distance`.
*/
export function useStepsProgress(stepCount, { startAt = 0.8, distance = 0.45 } = {}) {
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
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
  }, [stepCount, startAt, distance]);

  return { stepsRef, lineRef, activeStep };
}
