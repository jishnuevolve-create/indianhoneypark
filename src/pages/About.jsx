import { ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import SafeImage from '../components/common/SafeImage';
import WhatsAppButton from '../components/common/WhatsAppButton';
import PageHeader from '../components/layout/PageHeader';
import { aboutContent } from '../data/pageContent';
import { usePageMeta } from '../hooks/usePageMeta';

// "Our Story" page. All text comes from src/data/pageContent.js.
function About() {
  usePageMeta('Our Story', aboutContent.intro);

  return (
    <>
      <PageHeader
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.heading}
        description={aboutContent.intro}
      />

      <Container className="grid items-start gap-12 pb-24 lg:grid-cols-2 lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <SafeImage
            src={aboutContent.image}
            alt={aboutContent.imageAlt}
            loading="eager"
            className="aspect-[4/4.5] w-full rounded-[2rem] object-cover"
          />
        </Reveal>

        <div className="space-y-12">
          {aboutContent.sections.map((section, index) => (
            <Reveal
              key={section.heading}
              delay={index * 80}
              className="border-t border-ink/10 pt-8"
            >
              <p className="font-display text-sm text-amber italic">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-3xl">{section.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{section.text}</p>
            </Reveal>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/shop">
              Explore Collection
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <WhatsAppButton label="Talk to us" variant="outline" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default About;
