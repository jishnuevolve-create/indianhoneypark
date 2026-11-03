import { useCallback, useEffect, useRef, useState } from 'react';
import { getActiveJar, getScrollTrackProgress, getSlidePosition } from '../utils/heroScroll';
import { scrollToPosition } from '../utils/smoothScroll';

const SCROLL_HINT_UNTIL = 0.03; // "Scroll to explore" shows until 3% of the hero

/*
  Scroll state for the pinned homepage hero.

  - containerRef: attach to the tall wrapper (its first child is the pinned panel).
  - isPinned: whether pinning is active (only on screens matching pinnedQuery).
  - activeJar: which jar's text to show.
  - isAtStart: true until the visitor starts scrolling (shows the scroll hint).
  - scrollToProgress(p): smoothly scrolls to a point in the hero (0 → 1).

  React only re-renders when activeJar or isAtStart actually change (a handful of
  times), not on every scroll frame. Everything that moves continuously (jars,
  progress bar, ring) is updated directly in HeroShowcase.
*/
export function useHeroScroll(pinnedQuery, jarCount) {
  const containerRef = useRef(null);
  const [isPinned, setIsPinned] = useState(() => window.matchMedia(pinnedQuery).matches);
  const [activeJar, setActiveJar] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);

  // Switch pinning on or off when the screen size changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia(pinnedQuery);
    const handleChange = () => setIsPinned(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [pinnedQuery]);

  useEffect(() => {
    if (!isPinned) return undefined;
    let frameId = null;

    function update() {
      frameId = null;
      const progress = getScrollTrackProgress(containerRef.current);
      // Same value as before = React skips the re-render.
      setActiveJar(getActiveJar(getSlidePosition(progress, jarCount)));
      setIsAtStart(progress < SCROLL_HINT_UNTIL);
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
  }, [isPinned, jarCount]);

  const scrollToProgress = useCallback((targetProgress) => {
    const container = containerRef.current;
    if (!container) return;
    const { top, height } = container.getBoundingClientRect();
    const pinnedPanelHeight = container.firstElementChild?.offsetHeight || window.innerHeight;
    scrollToPosition(window.scrollY + top + targetProgress * (height - pinnedPanelHeight));
  }, []);

  return { containerRef, isPinned, activeJar, isAtStart, scrollToProgress };
}
