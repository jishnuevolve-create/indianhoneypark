import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { startSmoothScroll } from '../../utils/smoothScroll';
import CartDrawer from '../cart/CartDrawer';
import ErrorBoundary from '../common/ErrorBoundary';
import LoadingSpinner from '../common/LoadingSpinner';
import ScrollToTop from '../common/ScrollToTop';
import AnnouncementBar from './AnnouncementBar';
import FloatingActions from './FloatingActions';
import Footer from './Footer';
import Header from './Header';

// The frame shared by every page: header on top, footer at the bottom, cart drawer on the side.
function Layout() {
  const { pathname } = useLocation();

  // Smooth wheel scrolling for the whole site (see utils/smoothScroll.js).
  useEffect(() => startSmoothScroll(), []);

  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only z-[80] rounded-full bg-ink px-5 py-3 text-sm text-warm-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* The key resets the error screen when the visitor goes to another page. */}
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingActions />
      <CartDrawer />
    </>
  );
}

export default Layout;
