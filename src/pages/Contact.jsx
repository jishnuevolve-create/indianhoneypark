import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import SocialIcon from '../components/common/SocialIcon';
import PageHeader from '../components/layout/PageHeader';
import { contactContent } from '../data/pageContent';
import { siteConfig } from '../data/siteConfig';
import { usePageMeta } from '../hooks/usePageMeta';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { generateGeneralEnquiryMessage } from '../utils/whatsapp';

const inputStyles =
  'w-full rounded-2xl border border-ink/15 bg-surface px-4 py-3 text-base outline-none placeholder:text-ink-soft/50 focus:border-honey focus:ring-4 focus:ring-honey/15';

// Contact details from siteConfig.js plus a message form that opens WhatsApp.
function Contact() {
  usePageMeta('Contact', contactContent.intro);
  const { openWhatsApp } = useWhatsApp();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const { contact } = siteConfig;
  const contactDetails = [
    contact.phone && {
      icon: Phone,
      label: 'Phone',
      text: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
    },
    contact.email && {
      icon: Mail,
      label: 'Email',
      text: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.address && { icon: MapPin, label: 'Address', text: contact.address },
    contact.hours && { icon: Clock, label: 'Hours', text: contact.hours },
  ].filter(Boolean);

  function handleSubmit(event) {
    event.preventDefault();
    if (message.trim().length < 5) {
      setMessageError('Please write a short message.');
      return;
    }
    setMessageError('');
    openWhatsApp(generateGeneralEnquiryMessage(name, message));
  }

  return (
    <>
      <PageHeader
        eyebrow={contactContent.eyebrow}
        title={contactContent.heading}
        description={contactContent.intro}
      />

      <Container className="grid gap-10 pb-24 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-4 lg:col-span-5">
          {contactDetails.map(({ icon: DetailIcon, label, text, href }) => (
            <div key={label} className="flex gap-4 rounded-3xl bg-cream p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface text-amber-dark">
                <DetailIcon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{label}</p>
                {href ? (
                  <a href={href} className="text-ink-soft hover:text-ink">
                    {text}
                  </a>
                ) : (
                  <p className="text-ink-soft">{text}</p>
                )}
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-forest p-6 text-warm-white">
            <SocialIcon name="whatsapp" className="size-7 text-[#7fd1a0]" />
            <p className="mt-4 font-display text-2xl">The quickest way to reach us</p>
            <p className="mt-2 text-sm text-warm-white/70">
              Orders, questions and support are all handled personally on WhatsApp.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-[2rem] border border-ink/10 p-6 sm:p-10 lg:col-span-7"
        >
          <h2 className="text-3xl">Send us a message</h2>
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Your name <span className="font-normal text-ink-soft">(optional)</span>
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-invalid={Boolean(messageError)}
              aria-describedby={messageError ? 'contact-message-error' : undefined}
              className={`${inputStyles} resize-none`}
            />
            {messageError && (
              <p id="contact-message-error" className="mt-1.5 text-sm text-[#b4441f]">
                {messageError}
              </p>
            )}
          </div>
          <Button type="submit" variant="whatsapp" size="lg">
            <SocialIcon name="whatsapp" className="size-5" />
            Send on WhatsApp
          </Button>
          <p className="text-xs text-ink-soft">
            WhatsApp opens with your message ready to review and send.
          </p>
        </form>
      </Container>
    </>
  );
}

export default Contact;
