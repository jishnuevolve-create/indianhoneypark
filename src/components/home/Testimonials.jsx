import { Quote } from 'lucide-react';
import { testimonials } from '../../data/homeContent';
import { siteConfig } from '../../data/siteConfig';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import WhatsAppButton from '../common/WhatsAppButton';

const feedbackMessage = `Hello ${siteConfig.brandName}, I would like to share feedback about your honey:`;

/*
  Shows real customer reviews from homeContent.js -> testimonials.
  While the list is empty, an invitation to leave feedback is shown instead.
*/
function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <section aria-labelledby="reviews-heading" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="reviews-heading"
            eyebrow="Customer Love"
            title="Words From Our Customers"
          />
        </Reveal>

        {hasReviews ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {testimonials.map((review, index) => (
              <Reveal as="li" key={`${review.name}-${index}`} delay={index * 80}>
                <figure className="flex h-full flex-col rounded-[1.75rem] bg-cream p-7">
                  <Quote className="size-7 text-honey" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-relaxed">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold">{review.name}</span>
                    {review.location && <span className="text-ink-soft"> · {review.location}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={100} className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-[2rem] border border-honey/25 bg-surface px-6 py-12 text-center shadow-soft sm:px-12 sm:py-14">
              <Quote className="mx-auto size-9 text-honey" aria-hidden="true" />
              <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
                Reviews from our customers will appear here soon.
              </p>
              <p className="mt-3 text-ink-soft">
                Tried our honey? We would love to hear what you think.
              </p>
              <WhatsAppButton
                label="Share your feedback"
                message={feedbackMessage}
                variant="outline"
                className="mt-7"
              />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export default Testimonials;
