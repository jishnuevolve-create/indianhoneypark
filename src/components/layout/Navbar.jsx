import { Link, NavLink } from 'react-router-dom';
import { mainNavigation } from '../../data/navigation';

const linkStyles =
  'relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100';

// Desktop navigation links (the mobile version lives in MobileMenu.jsx).
function Navbar() {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {mainNavigation.map((link) => (
          <li key={link.to}>
            {link.to.includes('#') ? (
              // Section links on the homepage are never shown as "active".
              <Link to={link.to} className={`${linkStyles} text-ink-soft`}>
                {link.label}
              </Link>
            ) : (
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `${linkStyles} ${isActive ? 'text-ink after:scale-x-100' : 'text-ink-soft'}`
                }
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
