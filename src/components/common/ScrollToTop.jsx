import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToElement, scrollToPosition } from '../../utils/smoothScroll';

const MAX_ATTEMPTS = 40; // × 50ms = wait up to 2 seconds for a page to finish loading

// Scroll position of every visited page, so Back/Forward can return to it.
const savedScrollPositions = new Map();

// Retries `action` every 50ms until it returns true (e.g. until the page is tall enough).
function retryUntilDone(action) {
  let attempts = 0;
  let timerId;
  function attempt() {
    if (action() || attempts >= MAX_ATTEMPTS) return;
    attempts += 1;
    timerId = setTimeout(attempt, 50);
  }
  attempt();
  return () => clearTimeout(timerId);
}

/*
  Controls where the page is scrolled to when the address changes:
  - Back / Forward buttons: return to where the visitor was on that page.
  - Link with a #section (e.g. "/#faq"): scroll to that section.
  - Any other new page: start at the top.
*/
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType(); // 'POP' = Back/Forward button

  // The site manages scrolling itself, so the browser shouldn't also try.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  // Keep remembering this page's scroll position while the visitor is on it.
  useEffect(() => {
    function rememberPosition() {
      // When a link is clicked, the address changes first and the browser may trim the
      // scroll position to fit the next page before this listener is removed. Only save
      // while this page's own history entry is still the current one.
      // (The very first page of a visit has no key in history; React Router calls it "default".)
      if ((window.history.state?.key ?? 'default') !== key) return;
      savedScrollPositions.set(key, window.scrollY);
    }
    window.addEventListener('scroll', rememberPosition, { passive: true });
    return () => window.removeEventListener('scroll', rememberPosition);
  }, [key]);

  useEffect(() => {
    const savedPosition = savedScrollPositions.get(key);

    if (navigationType === 'POP' && savedPosition !== undefined) {
      // Wait until the page is tall enough to scroll back to the old position.
      return retryUntilDone(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll < savedPosition - 1) return false;
        scrollToPosition(savedPosition, { immediate: true });
        return true;
      });
    }

    if (hash) {
      return retryUntilDone(() => {
        const section = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!section) return false;
        scrollToElement(section);
        return true;
      });
    }

    scrollToPosition(0, { immediate: true });
    return undefined;
  }, [pathname, hash, key, navigationType]);

  return null;
}

export default ScrollToTop;
