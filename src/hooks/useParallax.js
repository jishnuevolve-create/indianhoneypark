import { useEffect, useRef } from 'react';

/*
  Gentle parallax: the element drifts up or down a little as the page scrolls.
  strength = how many pixels it can move in each direction.
  Attach the returned ref to the element. Turned off for reduced-motion visitors.
*/
export function useParallax(strength = 40) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || prefersReducedMotion) return undefined;

    let frameId = null;
    function update() {
      frameId = null;
      const { top, height } = element.getBoundingClientRect();
      // -1 when the element is just below the screen, +1 when it has just left the top.
      const position = 1 - ((top + height) / (window.innerHeight + height)) * 2;
      if (position < -1 || position > 1) return; // off screen: nothing to do
      element.style.transform = `translate3d(0, ${(-position * strength).toFixed(1)}px, 0)`;
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
  }, [strength]);

  return elementRef;
}
