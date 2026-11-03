import { useEffect, useRef } from 'react';
import { withBase } from '../../utils/assetUrl';
import { getHeroScrollProgress, getJarPhase, getSlidePosition } from '../../utils/heroScroll';

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

function padNumber(number) {
  return String(number).padStart(2, '0');
}

/*
  The jar in the centre of the hero.

  Pinned (scroll-driven) mode: the jars move exactly as far as the visitor scrolls.
  The current jar lifts up and fades while the next one rises in; between changes
  each jar holds still. The progress bar under the jar fills at the same time.
  These styles are written straight to the elements on every frame (no React
  re-render), which keeps the motion smooth on slower phones.

  Not pinned (very short screens): the dots switch jars with a short animation.

  Also: the jar floats gently, tilts towards the mouse on computers, and only
  jars up to one ahead of the current one are downloaded.
*/
function HeroShowcase({ slides, activeIndex, onSelect, trackRef, isPinned }) {
  const tiltRef = useRef(null);
  const jarRefs = useRef([]);
  const fillRefs = useRef([]);
  const slideCount = slides.length;

  useEffect(() => {
    if (!isPinned) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = null;

    function render() {
      frameId = null;
      const progress = getHeroScrollProgress(trackRef.current);
      const position = getSlidePosition(progress, slideCount);

      jarRefs.current.forEach((jar, index) => {
        if (!jar) return;
        const phase = getJarPhase(position, index); // -1 gone up, 0 centre, +1 waiting below
        const distance = Math.abs(phase);
        // Fade quickly, so the old jar has mostly gone before the new one is clearly
        // visible (a clean hand-over instead of two labels overlapping).
        const opacity = Math.max(0, 1 - distance * 1.7);
        jar.style.opacity = String(opacity);
        jar.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
        jar.style.transform = prefersReducedMotion
          ? 'scale(1.1)'
          : `translate3d(0, ${phase * 16}%, 0) scale(${1.1 - distance * 0.14}) rotate(${phase * 8}deg)`;
      });

      fillRefs.current.forEach((fill, index) => {
        if (!fill) return;
        const filled = Math.min(1, Math.max(0, progress * slideCount - index));
        fill.style.transform = `scaleX(${filled})`;
      });
    }

    function scheduleRender() {
      if (frameId === null) frameId = requestAnimationFrame(render);
    }

    scheduleRender();
    window.addEventListener('scroll', scheduleRender, { passive: true });
    window.addEventListener('resize', scheduleRender);
    return () => {
      window.removeEventListener('scroll', scheduleRender);
      window.removeEventListener('resize', scheduleRender);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [isPinned, slideCount, trackRef]);

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
      className="relative mx-auto w-full max-w-[min(300px,30svh)] sm:max-w-[min(440px,46svh)] lg:max-w-[min(520px,60svh)]"
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
              const webp900 = withBase(slide.image).replace(/\.png$/, '.webp');
              const webp600 = withBase(slide.image).replace(/\.png$/, '-600.webp');
              // Pinned: styles come from the scroll position (set in the effect above).
              const stateClasses = isPinned
                ? 'will-change-transform'
                : `transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'translate-y-0 scale-110 rotate-0 opacity-100'
                      : 'translate-y-6 scale-95 -rotate-6 opacity-0'
                  }`;
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
                    ref={(element) => {
                      jarRefs.current[index] = element;
                    }}
                    src={shouldLoad ? withBase(slide.image) : undefined}
                    alt={isActive ? `${slide.product.name} jar` : ''}
                    aria-hidden={!isActive}
                    width="900"
                    height="900"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                    className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-[0_24px_30px_rgb(107_61_12/0.25)] ${stateClasses}`}
                  />
                </picture>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress: "01 ━━ ━━ ━━ ━━ 04". Each segment fills while its jar is on screen;
          clicking a segment jumps to that jar. */}
      <div className="mt-1 flex items-center justify-center gap-3 text-xs font-semibold text-honey-brown tabular-nums">
        <span aria-hidden="true">{padNumber(activeIndex + 1)}</span>
        <div className="flex" role="group" aria-label="Choose a honey">
          {slides.map((slide, index) => (
            <button
              key={slide.productSlug}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Show ${slide.product.name}`}
              aria-current={index === activeIndex}
              className="group cursor-pointer px-1 py-3"
            >
              <span className="block h-1 w-7 overflow-hidden rounded-full bg-honey-brown/20 transition-colors group-hover:bg-honey-brown/35 sm:w-10">
                <span
                  ref={(element) => {
                    fillRefs.current[index] = element;
                  }}
                  className={`block h-full origin-left rounded-full bg-honey-brown ${
                    isPinned ? '' : 'transition-transform duration-500'
                  }`}
                  style={
                    isPinned ? undefined : { transform: `scaleX(${index <= activeIndex ? 1 : 0})` }
                  }
                />
              </span>
            </button>
          ))}
        </div>
        <span className="text-honey-brown/50" aria-hidden="true">
          {padNumber(slideCount)}
        </span>
      </div>
    </div>
  );
}

export default HeroShowcase;
