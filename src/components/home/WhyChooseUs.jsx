import { whyChooseUsContent } from '../../data/homeContent';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import FeatureIcon from './FeatureIcon';

// "Best feature / We Provide The Best Quality": four feature cards with icons.
function WhyChooseUs() {
  const { eyebrow, heading, items } = whyChooseUsContent;

  return (
    <section id="why-choose-us" aria-labelledby="why-heading" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading id="why-heading" eyebrow={eyebrow} title={heading} />
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 90}
              className="group flex flex-col items-center rounded-[1.5rem] border border-honey/25 bg-surface px-4 py-8 text-center transition duration-500 hover:-translate-y-1 hover:border-honey/50 hover:shadow-lift sm:rounded-[2rem] sm:px-7 sm:py-10"
            >
              {/* Realistic 3D icon that lifts slightly on hover */}
              <FeatureIcon
                name={item.icon}
                className="size-20 object-contain drop-shadow-[0_10px_12px_rgba(120,70,10,0.22)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-105 sm:size-28"
              />
              <h3 className="mt-5 text-base sm:mt-7 sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-honey-brown/80 sm:mt-3 sm:text-base">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default WhyChooseUs;
