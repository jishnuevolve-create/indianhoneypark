import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { heroContent } from '../../data/homeContent';
import { siteConfig } from '../../data/siteConfig';
import { useScrollSteps } from '../../hooks/useScrollSteps';
import { getProductBySlug } from '../../utils/productUtils';
import Button from '../common/Button';
import Container from '../common/Container';
import WhatsAppButton from '../common/WhatsAppButton';
import HeroShowcase from './HeroShowcase';

// How much scrolling (in % of the screen height) each jar stays on screen for.
const SCROLL_PER_SLIDE_VH = 70;

// The hero pins on every screen at least 450px tall (all phones held upright).
// On phones the sizes below scale with the screen height so everything fits.
// Only very short screens (e.g. a phone turned sideways) get a normal hero where the dots switch the jar.
const HERO_PINNED_QUERY = '(min-height: 450px)';

// Hero slides joined with their product (slides for missing products are skipped).
const slides = heroContent.slides
  .map((slide) => ({ ...slide, product: getProductBySlug(slide.productSlug) }))
  .filter((slide) => slide.product);

/*
  Homepage hero: heading on the left, the jar in the centre, and details about
  that jar on the right (stacked in that order on phones).

  While the visitor scrolls, the hero stays pinned and shows each jar in turn.
  After the last jar, the page continues scrolling normally.

  The negative top margin lets the yellow background continue behind the header,
  which stays see-through while it is over this section (see Header.jsx).
*/
function Hero() {
  const { badge, headingStart, headingHighlight } = heroContent;
  const { containerRef, isPinned, activeStep, progress, scrollToStep } = useScrollSteps(
    slides.length,
    HERO_PINNED_QUERY,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (slides.length === 0) return null;

  // Pinned: scrolling decides the jar. Not pinned: the dots do.
  const activeIndex = isPinned ? activeStep : selectedIndex;
  const activeSlide = slides[activeIndex];
  const { product } = activeSlide;

  return (
    <section id="home-hero" className="relative -mt-(--header-h) bg-sunshine">
      {/* The tall wrapper gives the visitor something to scroll through while the hero is pinned */}
      <div
        ref={containerRef}
        style={isPinned ? { height: `${100 + slides.length * SCROLL_PER_SLIDE_VH}vh` } : undefined}
      >
        <div
          className={`hero-sunshine relative overflow-hidden pt-(--header-h) ${
            isPinned ? 'sticky top-0 flex h-svh flex-col justify-center' : ''
          }`}
        >
          <Container className="grid items-center gap-3 py-3 max-sm:gap-[1.5svh] sm:gap-6 sm:py-6 lg:grid-cols-12 lg:gap-4">
            <div className="animate-fade-up text-center lg:col-span-4">
              <p className="hidden items-center gap-2 rounded-full border border-honey-brown/20 bg-warm-white/35 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-honey-brown uppercase sm:inline-flex">
                <span className="size-1.5 rounded-full bg-honey-brown" aria-hidden="true" />
                {badge}
              </p>
              <h1 className="text-ink max-sm:text-[clamp(1.6rem,4.6svh,2.5rem)] sm:mt-6">
                {headingStart}{' '}
                <em className="font-semibold text-honey-brown">{headingHighlight}</em>
              </h1>
            </div>

            <div className="animate-fade-in [animation-delay:150ms] lg:col-span-4">
              <HeroShowcase
                slides={slides}
                activeIndex={activeIndex}
                onSelect={isPinned ? scrollToStep : setSelectedIndex}
              />
            </div>

            {/* Details for the jar on screen. The key replays the fade-in for each new jar. */}
            <div
              key={activeSlide.productSlug}
              className="animate-fade-up text-center lg:col-span-4"
            >
              <p className="font-script text-[clamp(1.25rem,3.6svh,1.5rem)] text-honey-brown sm:text-4xl">
                {activeSlide.tagline}
              </p>
              <h2 className="mt-1 text-[clamp(1.3rem,3.4svh,1.5rem)] font-semibold sm:mt-2 sm:text-3xl">
                {product.name}
              </h2>
              <p className="mx-auto mt-2 line-clamp-2 min-h-[2lh] max-w-sm text-sm leading-relaxed text-ink/75 sm:mt-3 sm:line-clamp-3 sm:min-h-[3lh] sm:text-lg [@media(max-width:639px)_and_(max-height:620px)]:hidden">
                {product.description}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 sm:mt-7 sm:flex-wrap sm:gap-3 lg:flex-col">
                <Button to={`/products/${product.slug}`} className="max-sm:px-5">
                  View Product
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <WhatsAppButton
                  variant="outline"
                  className="border-ink/25 max-sm:px-5"
                  label={
                    <>
                      <span className="sm:hidden">WhatsApp</span>
                      <span className="hidden sm:inline">Order on WhatsApp</span>
                    </>
                  }
                  message={`Hello ${siteConfig.brandName}, I would like to order ${product.name}.`}
                />
              </div>
            </div>
          </Container>

          {/* "Scroll" hint, shown only before the visitor starts scrolling */}
          {isPinned && (
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-5 hidden flex-col items-center gap-1 text-xs font-semibold tracking-[0.2em] text-honey-brown/70 uppercase transition-opacity duration-500 lg:flex ${
                progress < 0.03 ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              Scroll to explore
              <ChevronDown className="size-4 animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
