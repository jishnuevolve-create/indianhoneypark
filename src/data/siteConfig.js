/*
  SITE CONFIGURATION
  All business details live here. Update this file instead of editing components.
*/

export const siteConfig = {
  brandName: 'Indian Honey',
  logoSubline: 'Since 1990', // small line under the name in the header (leave '' to hide)
  tagline: "Nature's Finest Honey, In Every Drop.",
  siteUrl: 'https://www.example.com', // TODO: replace with your live domain

  // WhatsApp number in international format: country code + number, digits only.
  // Example for India: '919876543210' (91 = India, then the 10-digit mobile number).
  // Until this is set, WhatsApp buttons show a friendly "not configured" message.
  whatsappNumber: '919995701530', // +91 99957 01530 — all WhatsApp orders go here

  currency: {
    code: 'INR',
    locale: 'en-IN',
  },

  // Thin message bar above the header. Set enabled: true to show it again.
  announcement: {
    enabled: false,
    message: 'Seven honey varieties, now available to order on WhatsApp',
    linkLabel: 'Shop now',
    linkTo: '/shop',
  },

  contact: {
    phone: '+91 99957 01530',
    email: 'indianhoneypark90@gmail.com',
    address: 'Chentrappinni, Thrissur District, Kerala – 680 687',
    hours: '', // e.g. 'Mon–Sat, 10am–6pm'
  },

  // Leave a link empty ('') to hide that icon in the footer.
  socialLinks: {
    instagram: '',
    facebook: '',
    youtube: '',
  },

  seo: {
    defaultTitle: "Indian Honey | Nature's Finest Honey, In Every Drop",
    defaultDescription:
      'Discover seven varieties of carefully sourced honey from Indian Honey and order easily on WhatsApp.',
  },
};
