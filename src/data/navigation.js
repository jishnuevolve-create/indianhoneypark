/*
  NAVIGATION LINKS
  Used by the header, mobile menu and footer.
  Links starting with "/#" scroll to a section on the homepage.
*/

export const mainNavigation = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Our Story', to: '/about' },
  { label: 'Why Choose Us', to: '/#why-choose-us' },
  { label: 'Contact', to: '/contact' },
];

export const footerQuickLinks = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Our Story', to: '/about' },
  { label: 'How to Order', to: '/#how-to-order' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
];

export const footerPolicyLinks = [
  { label: 'Shipping Policy', to: '/policies/shipping' },
  { label: 'Privacy Policy', to: '/policies/privacy' },
  { label: 'Terms & Conditions', to: '/policies/terms' },
];
