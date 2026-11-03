/*
  Maths for the scroll-driven homepage hero.

  progress  0 → 1  how far the visitor has scrolled through the pinned hero
  position  0 → (number of jars - 1)  e.g. 1.5 = halfway from jar 2 to jar 3
  phase     -1 → 0 → +1  for one jar: -1 = gone up, 0 = in the centre, +1 = waiting below
*/

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Eases from 0 to 1 between start and end (flat before and after).
function smoothStep(start, end, value) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

// Each jar's stretch of scrolling: it changes only in the middle part,
// so the jar "holds" still before and after a change.
const CHANGE_STARTS_AT = 0.3;
const CHANGE_ENDS_AT = 0.7;

export function getHeroScrollProgress(trackElement) {
  if (!trackElement) return 0;
  const { top, height } = trackElement.getBoundingClientRect();
  const scrollableDistance = height - window.innerHeight;
  return scrollableDistance > 0 ? clamp(-top / scrollableDistance, 0, 1) : 0;
}

// Jar k sits exactly in the centre at progress (k + 0.5) / jarCount.
export function getSlidePosition(progress, jarCount) {
  return clamp(progress * jarCount - 0.5, 0, jarCount - 1);
}

export function getJarPhase(position, jarIndex) {
  const current = Math.floor(position);
  const change = smoothStep(CHANGE_STARTS_AT, CHANGE_ENDS_AT, position - current);
  if (jarIndex === current) return -change;
  if (jarIndex === current + 1) return 1 - change;
  return jarIndex < current ? -1 : 1;
}

/*
  Where to settle if the visitor stops scrolling half-way through a change:
  the nearest jar, or null if the hero is already resting on a jar.
*/
export function getNearestRestingJar(progress, jarCount) {
  const position = getSlidePosition(progress, jarCount);
  const fraction = position - Math.floor(position);
  const isMidChange = fraction > CHANGE_STARTS_AT - 0.05 && fraction < CHANGE_ENDS_AT + 0.05;
  if (!isMidChange || progress <= 0 || progress >= 1) return null;
  return Math.round(position);
}
