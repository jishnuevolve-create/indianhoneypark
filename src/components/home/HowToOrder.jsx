import { ArrowRight } from 'lucide-react';
import { howToOrderContent } from '../../data/homeContent';
import { useScrollSteps } from '../../hooks/useScrollSteps';
import Button from '../common/Button';
import Container from '../common/Container';
import Icon from '../common/Icon';
import SectionHeading from '../common/SectionHeading';

// How much extra scrolling (in % of the screen height) each step stays highlighted for.
const SCROLL_PER_STEP_VH = 45;

/*
  Three ordering steps that light up one by one as the visitor scrolls.
  On larger screens the section stays pinned until every step has been highlighted,
  then the page continues scrolling normally. (Logic lives in useScrollSteps.)
*/
function HowToOrder() {
  const { eyebrow, heading, steps } = howToOrderContent;
  const { containerRef, stepRefs, isPinned, activeStep, progress } = useScrollSteps(steps.length);

  // The line reaches each step's icon at the moment that step becomes active.
  const lineFillPercent =
    steps.length > 1 ? Math.min(1, (progress * steps.length) / (steps.length - 1)) * 100 : 100;

  return (
    <section id="how-to-order" aria-labelledby="how-heading" className="bg-forest text-warm-white">
      {/* A tall wrapper gives the visitor something to scroll through while the content is pinned */}
      <div
        ref={containerRef}
        style={isPinned ? { height: `${100 + steps.length * SCROLL_PER_STEP_VH}vh` } : undefined}
      >
        <div
          className={
            isPinned ? 'sticky top-0 flex h-svh flex-col justify-center pt-(--header-h)' : 'py-20'
          }
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
                  className="h-full bg-honey transition-[width] duration-150 ease-linear"
                  style={{ width: `${lineFillPercent}%` }}
                />
              </div>

              <ol className="relative grid gap-4 md:grid-cols-3 md:gap-8">
                {steps.map((step, index) => {
                  const isReached = index <= activeStep;
                  const isCurrent = index === activeStep;

                  return (
                    <li
                      key={step.title}
                      ref={(element) => {
                        stepRefs.current[index] = element;
                      }}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`flex gap-5 rounded-3xl p-5 transition-all duration-500 md:flex-col md:items-center md:p-6 md:text-center ${
                        isCurrent ? 'bg-warm-white/[0.06]' : ''
                      } ${isReached ? 'opacity-100' : 'opacity-40'}`}
                    >
                      <span
                        className={`relative flex size-14 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isReached
                            ? 'border-honey bg-honey text-ink'
                            : 'border-warm-white/20 bg-forest text-warm-white/70'
                        } ${isCurrent ? 'scale-110 ring-8 ring-honey/15' : ''}`}
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
        </div>
      </div>
    </section>
  );
}

export default HowToOrder;
