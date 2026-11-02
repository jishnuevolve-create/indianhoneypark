import { useEffect, useRef } from 'react';
import { pauseSmoothScroll, resumeSmoothScroll } from '../../utils/smoothScroll';

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const panelPositions = {
  right: {
    panel: 'inset-y-0 right-0 h-full w-full max-w-md',
    closed: 'translate-x-full',
  },
  left: {
    panel: 'inset-y-0 left-0 h-full w-[88%] max-w-sm',
    closed: '-translate-x-full',
  },
  top: {
    panel: 'inset-x-0 top-0 max-h-[85vh]',
    closed: '-translate-y-full',
  },
};

/*
  Accessible slide-out panel used by the cart, mobile menu and search.
  - Closes with Escape or by clicking the dark background.
  - Keeps keyboard focus inside while open and returns it afterwards.
  - Stops the page behind from scrolling.
  Pass a stable onClose (e.g. from useCallback) so focus is not reset on every render.
*/
function Drawer({ isOpen, onClose, side = 'right', label, className = '', children }) {
  const panelRef = useRef(null);
  const position = panelPositions[side];

  useEffect(() => {
    if (!isOpen) return undefined;

    const panel = panelRef.current;
    const previouslyFocusedElement = document.activeElement;
    const getFocusableElements = () => [...panel.querySelectorAll(FOCUSABLE_ELEMENTS)];

    (getFocusableElements()[0] || panel).focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    pauseSmoothScroll();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      resumeSmoothScroll();
      previouslyFocusedElement?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    // data-lenis-prevent lets lists inside the drawer scroll normally
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      inert={!isOpen}
      data-lenis-prevent
    >
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`absolute flex flex-col bg-warm-white shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          position.panel
        } ${isOpen ? 'translate-x-0 translate-y-0' : position.closed} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Drawer;
