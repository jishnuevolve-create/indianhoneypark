import { useState } from 'react';
import { getResponsiveImageProps, getThumbnailImageProps } from '../../utils/productUtils';
import SafeImage from '../common/SafeImage';

/*
  Main product image with thumbnails underneath (thumbnails only appear
  when there is more than one image).
  - initialImage: the image to show first (e.g. the selected bottle's photo).
  - onImageSelect: called when a thumbnail is clicked, so the page can select
    the matching bottle option.
*/
function ProductGallery({ images, productName, tint, initialImage, onImageSelect }) {
  const safeImages = images && images.length > 0 ? images : [''];
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, safeImages.indexOf(initialImage)),
  );
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  function handleThumbnailClick(index) {
    setActiveIndex(index);
    onImageSelect?.(safeImages[index]);
  }

  return (
    <div className="space-y-4">
      <div
        className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem]"
        style={{ backgroundColor: tint }}
      >
        <div className="absolute inset-x-[12%] top-[10%] bottom-0 rounded-t-full bg-warm-white/45" />
        <SafeImage
          key={activeImage}
          {...getResponsiveImageProps(activeImage, '(min-width: 1024px) 45vw, 100vw')}
          alt={`${productName} — image ${activeIndex + 1}`}
          loading="eager"
          className="relative h-[85%] w-full animate-fade-in object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-3" role="group" aria-label="Product images">
          {safeImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`size-20 cursor-pointer overflow-hidden rounded-2xl border-2 transition ${
                index === activeIndex
                  ? 'border-honey'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: tint }}
            >
              <SafeImage
                {...getThumbnailImageProps(image)}
                alt=""
                className="size-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
