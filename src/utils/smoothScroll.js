import Lenis from 'lenis';

/*
  Smooth "inertia" scrolling for mouse wheels and trackpads (powered by Lenis).
  - Phones keep their normal touch scrolling, which already feels smooth.
  - Visitors who prefer reduced motion get normal scrolling.
  Always scroll through scrollToPosition / scrollToElement below, so programmatic
  scrolling works the same whether smooth scrolling is on or off.
*/

let lenis = null;

export function startSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis || prefersReducedMotion) return () => {};

  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.9 });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

// Stops page scrolling (e.g. while a drawer is open) and starts it again.
export function pauseSmoothScroll() {
  lenis?.stop();
}

export function resumeSmoothScroll() {
  lenis?.start();
}

export function scrollToPosition(top, { immediate = false } = {}) {
  if (lenis) {
    // Re-measure the page first: after moving to a new page the height has changed,
    // and Lenis would otherwise stop at the old page's length.
    lenis.resize();
    lenis.scrollTo(top, { immediate, force: true });
  } else {
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
  }
}

// Scrolls so the element sits just below the floating header.
export function scrollToElement(element) {
  const headerHeight =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
  scrollToPosition(element.getBoundingClientRect().top + window.scrollY - headerHeight);
}
