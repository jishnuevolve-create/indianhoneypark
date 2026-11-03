import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { scrollToPosition } from '../../utils/smoothScroll';
import SocialIcon from '../common/SocialIcon';

const SHOW_AFTER_PX = 700;

const roundButtonStyles =
  'flex size-12 cursor-pointer items-center justify-center rounded-full shadow-lift transition-all duration-300 hover:-translate-y-0.5 active:scale-95';

/*
  Small round buttons in the bottom-right corner, shown once the visitor has
  scrolled past the homepage hero (or 700px on other pages):
  - Back to top (all screens)
  - WhatsApp (phones only, where the header has no room for it). Hidden on
    product pages, which already have a sticky "Add to Cart" bar at the bottom.
*/
function FloatingActions() {
  const { pathname } = useLocation();
  const { openWhatsApp } = useWhatsApp();
  const [isVisible, setIsVisible] = useState(false);
  const isProductPage = pathname.startsWith('/products/');

  useEffect(() => {
    let frameId = null;
    function update() {
      frameId = null;
      const hero = document.getElementById('home-hero');
      setIsVisible(
        hero
          ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.4
          : window.scrollY > SHOW_AFTER_PX,
      );
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
  }, [pathname]);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 transition-all duration-500 sm:right-6 sm:bottom-6 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      } ${isProductPage ? 'max-lg:hidden' : ''}`}
      inert={!isVisible}
    >
      <button
        type="button"
        onClick={() => scrollToPosition(0)}
        className={`${roundButtonStyles} bg-surface text-ink ring-1 ring-ink/10 hover:text-amber`}
        aria-label="Back to top"
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() =>
          openWhatsApp(`Hello ${siteConfig.brandName}, I would like to know more about your honey.`)
        }
        className={`${roundButtonStyles} bg-whatsapp text-white md:hidden`}
        aria-label="Chat with us on WhatsApp"
      >
        <SocialIcon name="whatsapp" className="size-6" />
      </button>
    </div>
  );
}

export default FloatingActions;
