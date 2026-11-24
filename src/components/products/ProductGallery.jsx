import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { getResponsiveImageProps, getThumbnailImageProps } from '../../utils/productUtils';
import SafeImage from '../common/SafeImage';

/*
  Product gallery.
  - Every photo is a full square picture: the three studio shots of the bottles
    (honeycomb backdrop, glossy floor) and the three lifestyle shots.
  - Arrows, swipe (phones) and the keyboard's left / right keys change the photo,
    and a counter shows where you are.
  - initialImage: the image to show first (e.g. the selected bottle's photo).
  - onImageSelect: called when the photo changes, so the page can select the matching bottle.
*/
function ProductGallery({ images, productName, tint, initialImage, onImageSelect }) {
  const safeImages = images && images.length > 0 ? images : [''];
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, safeImages.indexOf(initialImage)),
  );
  const swipeStartX = useRef(null);
  const activeImage = safeImages[activeIndex] ?? safeImages[0];
  const hasMany = safeImages.length > 1;

  function showImage(index) {
    const next = (index + safeImages.length) % safeImages.length;
    setActiveIndex(next);
    onImageSelect?.(safeImages[next]);
  }

  function handlePointerDown(event) {
    swipeStartX.current = event.clientX;
  }
  function handlePointerUp(event) {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) > 50) showImage(activeIndex + (distance < 0 ? 1 : -1));
  }
  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') showImage(activeIndex + 1);
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
  }

  const arrowClass =
    'absolute top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-warm-white/90 text-ink shadow-soft backdrop-blur transition hover:bg-warm-white hover:shadow-lift sm:size-11';

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        className="group relative aspect-square touch-pan-y overflow-hidden rounded-[1.75rem] select-none sm:rounded-[2rem]"
        style={{ backgroundColor: tint }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${productName} photos`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (swipeStartX.current = null)}
        onKeyDown={handleKeyDown}
      >
        {/* Every photo (studio shots and lifestyle shots) is a full square picture */}
        <SafeImage
          key={activeImage}
          {...getResponsiveImageProps(activeImage, '(min-width: 1024px) 45vw, 100vw')}
          alt={`${productName} - photo ${activeIndex + 1} of ${safeImages.length}`}
          loading="eager"
          draggable={false}
          className="absolute inset-0 size-full animate-fade-in object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => showImage(activeIndex - 1)}
              aria-label="Previous photo"
              className={`${arrowClass} left-3`}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => showImage(activeIndex + 1)}
              aria-label="Next photo"
              className={`${arrowClass} right-3`}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <span
              className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-white backdrop-blur"
              aria-hidden="true"
            >
              {activeIndex + 1} / {safeImages.length}
            </span>
          </>
        )}
      </div>

      {hasMany && (
        <div
          className="grid grid-cols-6 gap-2 sm:gap-3"
          role="group"
          aria-label="Choose a product photo"
        >
          {safeImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => showImage(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition sm:rounded-2xl ${
                index === activeIndex
                  ? 'border-honey shadow-soft'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: tint }}
            >
              <SafeImage
                {...getThumbnailImageProps(image)}
                alt=""
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
