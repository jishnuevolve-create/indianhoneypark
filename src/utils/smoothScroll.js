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

  // lerp: how much of the remaining distance is covered each frame (lower = longer, silkier glide)
  lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 1 });

  /*
    While the site is gliding somewhere by itself (back to top, a hero jar, a menu
    link), Lenis would ignore the scrollbar and keyboard until it arrives. If the
    visitor grabs the scrollbar or presses a scrolling key, stop the glide right
    there so their own scrolling always wins. (The mouse wheel already does this.)
  */
  const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
  function cancelGlide() {
    if (lenis?.isScrolling === 'smooth') {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    }
  }
  function handleKeyDown(event) {
    if (scrollKeys.includes(event.key)) cancelGlide();
  }
  function handlePointerDown(event) {
    // A press to the right of the page content is on the scrollbar.
    if (event.clientX >= document.documentElement.clientWidth) cancelGlide();
  }
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('pointerdown', handlePointerDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('pointerdown', handlePointerDown);
    lenis?.destroy();
    lenis = null;
  };
}

// True when mouse-wheel smooth scrolling is in use: Lenis is running and the visitor
// has a mouse or trackpad (on touch screens scrolling stays native).
export function isSmoothScrollActive() {
  return lenis !== null && window.matchMedia('(pointer: fine)').matches;
}

// Stops page scrolling (e.g. while a drawer is open) and starts it again.
export function pauseSmoothScroll() {
  lenis?.stop();
}

export function resumeSmoothScroll() {
  lenis?.start();
}

export function scrollToPosition(top, { immediate = false } = {}) {
  // Always a whole pixel: Lenis only finishes an animation when the rounded position
  // equals the target, so a target like 742.6 would never finish and would keep
  // overriding every other kind of scrolling (scrollbar, keyboard).
  const target = Math.max(0, Math.round(top));
  if (lenis) {
    // Re-measure the page first: after moving to a new page the height has changed,
    // and Lenis would otherwise stop at the old page's length.
    lenis.resize();
    lenis.scrollTo(target, { immediate, force: true });
  } else {
    window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' });
  }
}

// Scrolls so the element sits just below the floating header.
export function scrollToElement(element) {
  const headerHeight =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
  scrollToPosition(element.getBoundingClientRect().top + window.scrollY - headerHeight);
}
