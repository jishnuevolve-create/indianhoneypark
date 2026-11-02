import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

/*
  Brand logo + name. The logo image is public/images/logo/indian-honey-logo-128.webp (a small copy of indian-honey-logo.png)
  (to update it, replace both files and keep the same names).
  The small line under the name comes from siteConfig.logoSubline.
*/
function Logo({ tone = 'dark', onClick }) {
  const isLight = tone === 'light';

  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-2.5"
      aria-label={`${siteConfig.brandName} home`}
    >
      <img
        src="/images/logo/indian-honey-logo-128.webp"
        alt=""
        className="size-11 sm:size-12"
        width="48"
        height="48"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold tracking-tight sm:text-xl ${
            isLight ? 'text-warm-white' : 'text-ink'
          }`}
        >
          {siteConfig.brandName}
        </span>
        {siteConfig.logoSubline && (
          <span
            className={`mt-1 text-[10px] font-medium tracking-[0.28em] uppercase ${
              isLight ? 'text-warm-white/50' : 'text-honey-brown/70'
            }`}
          >
            {siteConfig.logoSubline}
          </span>
        )}
      </span>
    </Link>
  );
}

export default Logo;
