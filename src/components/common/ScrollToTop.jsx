import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToElement, scrollToPosition } from '../../utils/smoothScroll';

const MAX_ATTEMPTS = 20;

/*
  React Router does not scroll automatically when the page changes.
  - New page: scroll to the top.
  - Link with a #section (e.g. "/#faq"): scroll to that section once it has rendered.
*/
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToPosition(0, { immediate: true });
      return undefined;
    }

    let attempts = 0;
    let timerId;
    function scrollToSection() {
      const section = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (section) {
        scrollToElement(section);
      } else if (attempts < MAX_ATTEMPTS) {
        attempts += 1;
        timerId = setTimeout(scrollToSection, 50);
      }
    }
    scrollToSection();
    return () => clearTimeout(timerId);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
