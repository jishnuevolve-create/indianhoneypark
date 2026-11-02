import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { faqs } from '../../data/homeContent';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import WhatsAppButton from '../common/WhatsAppButton';

function FaqItem({ faq, isOpen, onToggle }) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <li className="border-b border-ink/10">
      <h3 className="font-sans">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-base font-semibold sm:text-lg"
        >
          {faq.question}
          <span
            className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen ? 'rotate-45 border-honey bg-honey text-ink' : 'border-ink/15'
            }`}
          >
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      {/* grid-rows trick animates the height smoothly between 0 and auto */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-12 pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
        </div>
      </div>
    </li>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-cream py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="faq-heading"
            eyebrow="Good to know"
            title="Questions, answered."
            description="Everything you need to know about ordering, delivery and payment."
            align="left"
          />
          <div className="mt-8 rounded-3xl bg-surface p-6">
            <p className="font-display text-xl">Still have a question?</p>
            <p className="mt-1 text-sm text-ink-soft">Our team is happy to help on WhatsApp.</p>
            <WhatsAppButton label="Ask us on WhatsApp" size="sm" className="mt-4" />
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <ul className="border-t border-ink/10">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

export default FAQ;
