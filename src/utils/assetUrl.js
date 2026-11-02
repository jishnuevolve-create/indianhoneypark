/*
  Image paths in the data files start with "/" (e.g. "/images/logo/...").
  When the site is served from a sub-folder (GitHub Pages: /indianhoneypark/),
  that folder has to be added in front. On Vercel and locally nothing changes.
*/
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

// For React Router: "/" normally, "/indianhoneypark" on GitHub Pages.
export const ROUTER_BASENAME = BASE_PATH || '/';

export function withBase(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE_PATH}${path}`;
}

// Same for a srcSet string: "a.webp 600w, b.webp 1200w"
export function withBaseSrcSet(srcSet) {
  if (!srcSet) return srcSet;
  return srcSet
    .split(',')
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [withBase(url), ...descriptor].join(' ');
    })
    .join(', ');
}
