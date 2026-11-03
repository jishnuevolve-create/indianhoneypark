import { ArrowRight } from 'lucide-react';
import { howToOrderContent } from '../../data/homeContent';
import { useStepsProgress } from '../../hooks/useStepsProgress';
import Button from '../common/Button';
import Container from '../common/Container';
import Icon from '../common/Icon';
import SectionHeading from '../common/SectionHeading';

/*
  Three ordering steps that light up one by one, and a gold line that fills,
  as the steps move up through the screen. The section scrolls normally (it is
  not pinned), so scrolling never feels stuck here.
*/
function HowToOrder() {
  const { eyebrow, heading, steps } = howToOrderContent;
  const { stepsRef, lineRef, activeStep } = useStepsProgress(steps.length);

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
    </section>
  );
}

export default HowToOrder;
