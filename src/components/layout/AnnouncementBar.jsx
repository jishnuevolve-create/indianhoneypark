import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

// Thin message bar above the header. Edit or switch it off in siteConfig.js -> announcement.
function AnnouncementBar() {
  const { enabled, message, linkLabel, linkTo } = siteConfig.announcement;
  if (!enabled || !message) return null;

  return (
    <div className="bg-forest-deep text-warm-white">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center text-xs tracking-wide sm:text-[13px]">
        <span>{message}</span>
        {linkLabel && linkTo && (
          <Link
            to={linkTo}
            className="group hidden items-center gap-1 font-semibold text-honey sm:inline-flex"
          >
            {linkLabel}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </p>
    </div>
  );
}

export default AnnouncementBar;
