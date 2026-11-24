import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { howToOrderContent } from '../../data/homeContent';
import Button from '../common/Button';
import Container from '../common/Container';
import Icon from '../common/Icon';
import SectionHeading from '../common/SectionHeading';

/*
  Three ordering steps. Scrolling changes nothing here: all steps are always shown.
  A step is highlighted when it is touched or tapped (or hovered with a mouse, or focused
  with the keyboard), and the gold line fills up to that step.
*/
function HowToOrder() {
  const { eyebrow, heading, steps } = howToOrderContent;
  const [activeStep, setActiveStep] = useState(null);

  const lineFill = activeStep === null ? 0 : activeStep / (steps.length - 1);

  return (
    <section
      id="how-to-order"
      aria-labelledby="how-heading"
      className="bg-forest py-20 text-warm-white lg:py-28"
    >
      <Container>
        <SectionHeading id="how-heading" eyebrow={eyebrow} title={heading} tone="light" />

        <div className="relative mt-12 lg:mt-16">
          {/* Progress line (tablet and desktop only) */}
          <div
            className="absolute top-[3.25rem] right-[16%] left-[16%] hidden h-px bg-warm-white/15 md:block"
            aria-hidden="true"
          >
            <div
              className="h-full origin-left bg-honey transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${lineFill})` }}
            />
          </div>

          <ol className="relative grid gap-4 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <li
                  key={step.title}
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
                  className={`flex cursor-pointer gap-5 rounded-3xl p-5 outline-none transition-all duration-500 select-none md:flex-col md:items-center md:p-6 md:text-center ${
                    isActive ? 'bg-warm-white/[0.08]' : ''
                  }`}
                >
                  <span
                    className={`relative flex size-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isActive
                        ? 'scale-110 border-honey bg-honey text-ink ring-8 ring-honey/15'
                        : 'border-warm-white/25 bg-forest text-warm-white/80'
                    }`}
                  >
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-honey uppercase">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-2xl">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-warm-white/65">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
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
