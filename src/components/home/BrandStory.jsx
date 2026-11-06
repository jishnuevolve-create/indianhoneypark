import { ArrowRight } from 'lucide-react';
import { brandStoryContent } from '../../data/homeContent';
import { useParallax } from '../../hooks/useParallax';
import Button from '../common/Button';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SafeImage from '../common/SafeImage';

function BrandStory() {
  const { eyebrow, heading, paragraphs, image, imageSrcSet, imageAlt, buttonLabel, buttonLink } =
    brandStoryContent;
  const parallaxRef = useParallax(30);

  return (
    <section aria-labelledby="story-heading" className="bg-cream py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative isolate">
          {/* The picture is slightly taller than its frame so it can drift (parallax) without gaps */}
          <div className="aspect-square w-full overflow-hidden rounded-[2rem]">
            <div ref={parallaxRef} className="-mt-[8%] h-[116%] will-change-transform">
              <SafeImage
                src={image}
                srcSet={imageSrcSet}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={imageAlt}
                className="size-full object-cover"
              />
            </div>
          </div>
          <div
            className="absolute -right-3 -bottom-3 -z-10 hidden size-32 rounded-[1.5rem] border border-botanical/30 sm:block"
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-2 font-script text-2xl text-amber sm:text-3xl">{eyebrow}</p>
          <h2 id="story-heading" className="text-[2rem] sm:text-5xl lg:text-[3.25rem]">
            {heading}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button to={buttonLink} variant="outline" className="mt-9">
            {buttonLabel}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

export default BrandStory;
