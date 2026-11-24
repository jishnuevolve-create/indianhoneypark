import { whyChooseUsContent } from '../../data/homeContent';
import Container from '../common/Container';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';

// "Why Choose Us": company credentials (from the introduction document) as a stats panel and reason cards.
function WhyChooseUs() {
  const { eyebrow, heading, intro, stats, reasons } = whyChooseUsContent;

  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading id="why-heading" eyebrow={eyebrow} title={heading} />
          <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-honey-brown/80">
            {intro}
          </p>
        </Reveal>

        {/* Key numbers */}
        <Reveal delay={80}>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-warm-white/10 text-warm-white lg:mt-16 lg:grid-cols-4 lg:rounded-[2rem]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-forest px-4 py-7 text-center sm:py-10">
                <dd className="font-display text-2xl text-honey sm:text-4xl">{stat.value}</dd>
                <dt className="mt-2 text-xs tracking-[0.15em] text-warm-white/70 uppercase sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Reasons */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-8 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal
              as="li"
              key={reason.title}
              delay={index * 70}
              className="group flex gap-4 rounded-[1.5rem] border border-honey/25 bg-surface p-5 transition duration-500 hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift sm:p-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-soft-yellow text-honey-brown transition-colors duration-500 group-hover:bg-honey group-hover:text-ink">
                <Icon name={reason.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-honey-brown/80 sm:text-base">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default WhyChooseUs;
