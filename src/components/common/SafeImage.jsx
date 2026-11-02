import { ImageOff } from 'lucide-react';
import { useState } from 'react';

/*
  An <img> that never shows a broken-image icon.
  - fallbackSrc (optional): tried first if the image fails, e.g. the full-size photo
    when its small "-600" copy is missing.
  - If everything fails, a soft placeholder is shown instead.
*/
function SafeImage({ src, fallbackSrc, alt, className = '', loading = 'lazy', srcSet, ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  const currentSrc = useFallback ? fallbackSrc : src;
  const hasFailed = !currentSrc || failedSrc === currentSrc;

  function handleError() {
    if (!useFallback && fallbackSrc && fallbackSrc !== src) {
      setUseFallback(true);
    } else {
      setFailedSrc(currentSrc);
    }
  }

  if (hasFailed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-cream text-ink-soft/60 ${className}`}
      >
        <ImageOff className="size-6" aria-hidden="true" />
        <span className="px-4 text-center text-xs">Image coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      srcSet={useFallback ? undefined : srcSet}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={handleError}
      className={className}
      {...props}
    />
  );
}

export default SafeImage;
