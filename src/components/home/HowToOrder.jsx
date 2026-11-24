import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { howToOrderContent } from '../../data/homeContent';
import Button from '../common/Button';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import FeatureIcon from './FeatureIcon';

// Honeycomb pattern drawn as a repeating background (decoration only)
const honeycombPattern = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 0l28 16v32L28 64 0 48V16zM28 66l28 16v16M28 66L0 82v16' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E\")",
};

/*
  Three ordering steps. Scrolling changes nothing here: all steps are always shown.
  A step is highlighted when it is touched or tapped (or hovered with a mouse, or focused
  with the keyboard).
*/
function HowToOrder() {
  const { eyebrow, heading, steps } = howToOrderContent;
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section
      id="how-to-order"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-forest py-20 text-warm-white lg:py-28"
    >
      {/* Decoration: faint honeycomb and a warm glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={honeycombPattern}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-honey/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading id="how-heading" eyebrow={eyebrow} title={heading} tone="light" />
        </Reveal>

        <ol className="mt-20 grid gap-24 md:grid-cols-3 md:gap-8 lg:mt-28">
          {steps.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 100}
                tabIndex={0}
                aria-current={isActive ? 'step' : undefined}
                // Touch / tap highlights and keeps the step; a mouse highlights while hovering.
                onPointerDown={() => setActiveStep(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setActiveStep(index);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse') setActiveStep(null);
                }}
                onFocus={() => setActiveStep(index)}
                onBlur={() => setActiveStep(null)}
                className="relative cursor-pointer outline-none select-none"
              >
                <div
                  className={`relative overflow-hidden rounded-[2rem] border px-6 pt-20 pb-8 text-center transition-all duration-500 ${
                    isActive
                      ? '-translate-y-2 border-honey/70 bg-honey/[0.12] shadow-[0_24px_60px_-20px_rgba(244,169,31,0.45)]'
                      : 'border-warm-white/10 bg-warm-white/[0.04]'
                  }`}
                >
                  {/* Big step number behind the text */}
                  <span
                    className={`pointer-events-none absolute -right-2 -bottom-6 font-display text-[9rem] leading-none font-semibold transition-colors duration-500 ${
                      isActive ? 'text-honey/20' : 'text-warm-white/[0.05]'
                    }`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>

                  <p className="relative text-xs font-semibold tracking-[0.25em] text-honey uppercase">
                    Step {index + 1}
                  </p>
                  <h3 className="relative mt-2 text-2xl lg:text-[1.65rem]">{step.title}</h3>
                  <p className="relative mx-auto mt-3 max-w-xs leading-relaxed text-warm-white/70">
                    {step.text}
                  </p>
                </div>

                {/* 3D icon sitting on the top edge of the card */}
                <div
                  className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                    isActive ? '-translate-y-[62%] scale-110' : ''
                  }`}
                >
                  <div
                    className={`absolute inset-3 rounded-full blur-2xl transition-opacity duration-500 ${
                      isActive ? 'bg-honey/60 opacity-100' : 'bg-honey/25 opacity-70'
                    }`}
                    aria-hidden="true"
                  />
                  <FeatureIcon
                    name={step.icon}
                    className="relative size-28 object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.35)] lg:size-32"
                  />
                </div>

                {/* Arrow to the next step (tablet and desktop) */}
                {index < steps.length - 1 && (
                  <span
                    className={`absolute top-1/2 -right-[1.6rem] z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border bg-forest transition-colors duration-500 md:flex ${
                      isActive
                        ? 'border-honey text-honey'
                        : 'border-warm-white/20 text-warm-white/50'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center lg:mt-16">
          <Button to="/shop" variant="light" size="lg">
            Start Shopping
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default HowToOrder;
