import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mainNavigation } from '../../data/navigation';
import Drawer from '../common/Drawer';
import Logo from '../common/Logo';
import WhatsAppButton from '../common/WhatsAppButton';

// Slide-in navigation for phones and tablets.
function MobileMenu({ isOpen, onClose }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" label="Menu">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full hover:bg-cream"
          aria-label="Close menu"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="space-y-1">
          {mainNavigation.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={onClose}
                className="group flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-2xl text-ink transition-colors hover:bg-cream"
              >
                {link.label}
                <ArrowUpRight
                  className="size-5 text-ink-soft/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-ink/10 p-5">
        <WhatsAppButton fullWidth size="lg" />
      </div>
    </Drawer>
  );
}

export default MobileMenu;
