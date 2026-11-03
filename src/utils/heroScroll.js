/*
  Maths for the scroll-driven homepage hero.

  progress  0 → 1  how far the visitor has scrolled through the pinned hero
  position  0 → (number of jars - 1)  jar k is centred at position k;
            e.g. 1.5 = halfway from jar 2 to jar 3
  phase     -1 → 0 → +1  for one jar: -1 = gone up, 0 = in the centre, +1 = waiting below

  Jar 1 sits exactly at the start of the hero and the last jar exactly at the end,
  so there is no "dead" scrolling before the first change or after the last one.
*/

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Eases from 0 to 1 between start and end (flat before and after).
function smoothStep(start, end, value) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

// Between two jars, the hand-over happens in this part of the scroll; the rest is
// a short "hold" where the jar only drifts gently with the scroll.
const CHANGE_STARTS_AT = 0.2;
const CHANGE_ENDS_AT = 0.8;

/*
  The track is the tall wrapper; its first child is the pinned panel.
  Using the panel's own height (a fixed "svh" height) instead of the browser
  window height keeps the jars steady on phones while the address bar
  slides in and out.
*/
export function getScrollTrackProgress(trackElement) {
  if (!trackElement) return 0;
  const { top, height } = trackElement.getBoundingClientRect();
  const pinnedPanelHeight = trackElement.firstElementChild?.offsetHeight || window.innerHeight;
  const scrollableDistance = height - pinnedPanelHeight;
  return scrollableDistance > 0 ? clamp(-top / scrollableDistance, 0, 1) : 0;
}

export function getSlidePosition(progress, jarCount) {
  return progress * Math.max(0, jarCount - 1);
}

// The jar whose text is shown: switches exactly half-way through each hand-over.
export function getActiveJar(position) {
  return Math.round(position);
}

// The scroll progress at which a jar sits in the centre (used to jump to a jar).
export function getProgressForJar(jarIndex, jarCount) {
  return jarCount > 1 ? jarIndex / (jarCount - 1) : 0;
}

export function getJarPhase(position, jarIndex) {
  const current = Math.floor(position);
  const change = smoothStep(CHANGE_STARTS_AT, CHANGE_ENDS_AT, position - current);
  if (jarIndex === current) return -change;
  if (jarIndex === current + 1) return 1 - change;
  return jarIndex < current ? -1 : 1;
}

// Progress bar: segment 1 is full from the start; segment k fills while the
// visitor scrolls from jar k-1 to jar k (it keeps moving during holds too).
export function getSegmentFill(position, segmentIndex) {
  if (segmentIndex === 0) return 1;
  return clamp(position - (segmentIndex - 1), 0, 1);
}

/*
  Where to settle if the visitor stops scrolling half-way through a hand-over.
  It always finishes the change in the direction they were scrolling
  (direction: 1 = down, -1 = up), so it never pulls against them.
  Returns the jar to settle on, or null if no hand-over is in progress.
*/
export function getRestingJarInDirection(progress, jarCount, direction) {
  const position = getSlidePosition(progress, jarCount);
  const current = Math.floor(position);
  const fraction = position - current;
  const isMidChange = fraction > CHANGE_STARTS_AT && fraction < CHANGE_ENDS_AT;
  if (!isMidChange || progress <= 0 || progress >= 1) return null;
  return direction >= 0 ? current + 1 : current;
}
