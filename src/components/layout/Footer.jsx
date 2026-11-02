import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerPolicyLinks, footerQuickLinks } from '../../data/navigation';
import { products } from '../../data/products';
import { siteConfig } from '../../data/siteConfig';
import Container from '../common/Container';
import Logo from '../common/Logo';
import SocialIcon from '../common/SocialIcon';
import WhatsAppButton from '../common/WhatsAppButton';

const footerLinkStyles = 'text-sm text-warm-white/65 transition-colors hover:text-honey';

function FooterLinkList({ title, links }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-warm-white/45 uppercase">
        {title}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={footerLinkStyles}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const { contact, socialLinks } = siteConfig;
  const productLinks = products.map((product) => ({
    label: product.name,
    to: `/products/${product.slug}`,
  }));

  // Only details that have been filled in siteConfig.js are shown.
  const contactDetails = [
    contact.phone && {
      icon: Phone,
      text: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, '')}`,
    },
    contact.email && { icon: Mail, text: contact.email, href: `mailto:${contact.email}` },
    contact.address && { icon: MapPin, text: contact.address },
    contact.hours && { icon: Clock, text: contact.hours },
  ].filter(Boolean);

  const activeSocialLinks = Object.entries(socialLinks).filter(([, url]) => Boolean(url));
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-warm-white">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-warm-white/65">
            {siteConfig.tagline} Explore our honey collection and order easily on WhatsApp.
          </p>
          {activeSocialLinks.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {activeSocialLinks.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.brandName} on ${name}`}
                    className="flex size-10 items-center justify-center rounded-full border border-warm-white/15 text-warm-white/80 transition-colors hover:border-honey hover:text-honey"
                  >
                    <SocialIcon name={name} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2">
          <FooterLinkList title="Explore" links={footerQuickLinks} />
        </div>

        <div className="lg:col-span-3">
          <FooterLinkList title="Our Honey" links={productLinks} />
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-warm-white/45 uppercase">
            Get in touch
          </h2>
          {contactDetails.length > 0 && (
            <ul className="mb-6 space-y-3">
              {contactDetails.map(({ icon: DetailIcon, text, href }) => (
                <li key={text} className="flex gap-3 text-sm text-warm-white/65">
                  <DetailIcon className="mt-0.5 size-4 shrink-0 text-honey" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-honey">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <WhatsAppButton label="Chat on WhatsApp" size="sm" />
        </div>
      </Container>

      <div className="border-t border-warm-white/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-warm-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerPolicyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-honey">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
