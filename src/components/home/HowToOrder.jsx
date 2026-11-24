import { ArrowRight } from 'lucide-react';
import { howToOrderContent } from '../../data/homeContent';
import { usePinnedSteps, useStepsProgress } from '../../hooks/useStepsProgress';
import Button from '../common/Button';
import Container from '../common/Container';
import Icon from '../common/Icon';
import SectionHeading from '../common/SectionHeading';

// How much scrolling (in % of the screen height) each step gets while the section is pinned.
const SCROLL_PER_STEP_VH = 60;

/*
  Three ordering steps. On most screens the section pins to the screen and each bit of
  scrolling moves to the next step (the gold line fills as it goes). After the last step
  it lets go and the page continues to the next section. On short screens, or for people
  who prefer less motion, it is a normal section whose steps light up as they scroll by.
*/
function HowToOrder() {
  const { eyebrow, heading, steps } = howToOrderContent;
  const isPinned = usePinnedSteps();
  const { sectionRef, stepsRef, lineRef, activeStep } = useStepsProgress(steps.length, {
    pinned: isPinned,
  });

  return (
    <section
      ref={sectionRef}
      id="how-to-order"
      aria-labelledby="how-heading"
      className="bg-forest text-warm-white"
      style={
        isPinned ? { height: `${100 + (steps.length - 1) * SCROLL_PER_STEP_VH}vh` } : undefined
      }
    >
      <div
        className={
          isPinned
            ? 'sticky top-0 flex h-svh flex-col justify-center pt-[var(--header-h)] pb-8'
            : 'py-20 lg:py-28'
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
                ref={lineRef}
                className="h-full origin-left scale-x-0 bg-honey transition-transform duration-200 ease-out"
              />
            </div>

            <ol ref={stepsRef} className="relative grid gap-4 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => {
                const isReached = index <= activeStep;
                const isCurrent = index === activeStep;

                return (
                  <li
                    key={step.title}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={`flex gap-5 rounded-3xl p-5 transition-all duration-500 md:flex-col md:items-center md:p-6 md:text-center ${
                      isCurrent ? 'bg-warm-white/[0.06]' : ''
                    } ${isReached ? 'opacity-100' : 'opacity-40'} ${
                      // Pinned on a phone: show one step at a time, centred, so it all fits on screen
                      isPinned
                        ? `max-md:flex-col max-md:items-center max-md:text-center ${
                            isCurrent ? '' : 'max-md:hidden'
                          }`
                        : ''
                    }`}
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

            {/* Phone only: which step you are on while the section is pinned */}
            {isPinned && (
              <div className="mt-6 flex justify-center gap-2 md:hidden" aria-hidden="true">
                {steps.map((step, index) => (
                  <span
                    key={step.title}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === activeStep ? 'w-8 bg-honey' : 'w-1.5 bg-warm-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
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

        {isPinned && (
          <p
            aria-hidden="true"
            className={`mt-6 text-center text-xs tracking-[0.25em] text-warm-white/50 uppercase transition-opacity duration-500 ${
              activeStep < steps.length - 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Keep scrolling
          </p>
        )}
      </div>
    </section>
  );
}

export default HowToOrder;
