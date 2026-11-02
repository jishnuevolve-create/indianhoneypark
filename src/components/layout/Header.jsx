import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Logo from '../common/Logo';
import WhatsAppButton from '../common/WhatsAppButton';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import SearchDialog from './SearchDialog';

const iconButtonStyles =
  'relative flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5';

/*
  Sticky site header: a floating rounded bar with the logo, navigation,
  search, cart and WhatsApp button.
  - Over the homepage hero: see-through, so the yellow shows behind it.
  - Everywhere else (and after scrolling past the hero): solid white with a soft shadow.
  Its total height is the --header-h value in globals.css.
*/
function Header() {
  const { cartCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Watches whether the homepage hero (id="home-hero") is still behind the header.
  useEffect(() => {
    let frameId = null;

    function updateHeaderStyle() {
      frameId = null;
      const hero = document.getElementById('home-hero');
      const headerBottom = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      );
      setIsOverHero(Boolean(hero) && hero.getBoundingClientRect().bottom > headerBottom);
    }

    function scheduleUpdate() {
      if (frameId === null) frameId = requestAnimationFrame(updateHeaderStyle);
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
    <>
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border px-3 transition-[background-color,border-color,box-shadow] duration-500 sm:h-[72px] sm:px-5 lg:px-7 ${
            isOverHero
              ? 'border-warm-white/30 bg-warm-white/25 backdrop-blur-md'
              : 'border-ink/5 bg-surface shadow-[0_14px_34px_-14px_rgb(107_61_12/0.35)]'
          }`}
        >
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`${iconButtonStyles} lg:hidden`}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <Logo />
          </div>

          <Navbar />

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={iconButtonStyles}
              aria-label="Search products"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className={iconButtonStyles}
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {cartCount > 0 && (
                // The key makes the badge "bump" every time the count changes.
                <span
                  key={cartCount}
                  className="absolute top-1 right-0.5 flex h-[18px] min-w-[18px] animate-bump items-center justify-center rounded-full bg-honey px-1 text-[10px] font-bold text-ink"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Hidden on phones to save space — the mobile menu has its own WhatsApp button. */}
            <div className="ml-2 hidden md:block">
              <WhatsAppButton size="sm" />
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <SearchDialog isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}

export default Header;
