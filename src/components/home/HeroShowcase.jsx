import { useRef } from 'react';

const MAX_TILT_DEGREES = 8;

// Small honeycomb shapes floating around the jar: [position classes, size, animation delay].
const floatingHexagons = [
  ['top-[8%] left-[6%]', 'size-7', '0s'],
  ['top-[22%] right-[2%]', 'size-5', '-3s'],
  ['bottom-[24%] left-[0%]', 'size-4', '-5s'],
  ['bottom-[12%] right-[8%]', 'size-6', '-7s'],
];

function Hexagon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2 21 7v10l-9 5-9-5V7z"
        fill="rgb(255 252 245 / 0.35)"
        stroke="var(--color-honey-brown)"
        strokeOpacity="0.25"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/*
  The jar in the centre of the hero. The hero decides which jar is active
  (based on scrolling); this component handles the visual effects:
  - jars cross-fade with a gentle scale and tilt
  - the jar floats, with a shadow that shrinks as it rises
  - on computers, the jar tilts slightly towards the mouse
  Only jars up to one ahead of the current one are downloaded, to keep the page fast.
*/
function HeroShowcase({ slides, activeIndex, onSelect }) {
  const tiltRef = useRef(null);

  // Tilt is applied with CSS variables, so moving the mouse does not re-render React.
  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || !tiltRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltRef.current.style.setProperty('--tilt-x', `${-y * MAX_TILT_DEGREES}deg`);
    tiltRef.current.style.setProperty('--tilt-y', `${x * MAX_TILT_DEGREES}deg`);
  }

  function resetTilt() {
    tiltRef.current?.style.setProperty('--tilt-x', '0deg');
    tiltRef.current?.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[min(300px,34svh)] sm:max-w-[min(440px,46svh)] lg:max-w-[min(520px,60svh)]"
      aria-roledescription="carousel"
      aria-label="Our honey jars"
    >
      <div
        className="relative aspect-square"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        {/* Glowing circle and slowly turning ring behind the jar */}
        <div
          className="absolute inset-[14%] rounded-full bg-sunshine-light shadow-[0_0_60px_10px_rgb(255_220_125/0.5)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[7%] animate-spin-slow rounded-full border-2 border-dashed border-honey-brown/15"
          aria-hidden="true"
        />
        {floatingHexagons.map(([position, size, delay]) => (
          <Hexagon
            key={position}
            className={`absolute animate-drift ${position} ${size}`}
            style={{ animationDelay: delay }}
          />
        ))}

        {/* Soft shadow under the jar */}
        <div
          className="absolute bottom-[5%] left-1/2 h-6 w-[46%] -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="size-full animate-float-shadow rounded-[50%] bg-honey-brown/35 blur-md" />
        </div>

        {/* Tilt layer → float layer → jars */}
        <div
          ref={tiltRef}
          className="absolute inset-0 transition-transform duration-300 ease-out [transform:perspective(900px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
        >
          <div className="absolute inset-0 animate-float">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              const shouldLoad = index <= activeIndex + 1;
              // Light WebP copies sit next to each PNG (jar.webp = 900px, jar-600.webp = 600px).
              // Browsers use the WebP; the PNG is the fallback for very old browsers.
              const webp900 = slide.image.replace(/\.png$/, '.webp');
              const webp600 = slide.image.replace(/\.png$/, '-600.webp');
              return (
                <picture key={slide.productSlug}>
                  {shouldLoad && (
                    <source
                      type="image/webp"
                      srcSet={`${webp600} 600w, ${webp900} 900w`}
                      sizes="(min-width: 1024px) 520px, (min-width: 640px) 440px, 300px"
                    />
                  )}
                  <img
                    src={shouldLoad ? slide.image : undefined}
                    alt={isActive ? `${slide.product.name} jar` : ''}
                    aria-hidden={!isActive}
                    width="900"
                    height="900"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                    className={`absolute inset-0 size-full object-contain drop-shadow-[0_24px_30px_rgb(107_61_12/0.25)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'translate-y-0 scale-110 rotate-0 opacity-100'
                        : 'pointer-events-none translate-y-6 scale-95 -rotate-6 opacity-0'
                    }`}
                  />
                </picture>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots: show which jar is active and jump to another */}
      <div className="mt-1 flex justify-center" role="group" aria-label="Choose a honey">
        {slides.map((slide, index) => (
          <button
            key={slide.productSlug}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show ${slide.product.name}`}
            aria-current={index === activeIndex}
            className="cursor-pointer p-1.5"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-honey-brown' : 'w-2 bg-honey-brown/30'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeroShowcase;
