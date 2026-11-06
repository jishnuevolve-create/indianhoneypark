/*
  HOMEPAGE CONTENT
  Edit the text and images of each homepage section here.
  Icons come from lucide-react (https://lucide.dev/icons) — use the icon's name as text.
*/

export const heroContent = {
  badge: 'Seven honey varieties',
  headingStart: "Nature's Finest Honey,",
  headingHighlight: 'In Every Drop.',
  /*
    Jars shown in the hero, one after another as the visitor scrolls.
    - image: transparent PNG in public/images/hero/
    - tagline: the handwritten line on the right
    The product name and description on the right come from products.js.
  */
  slides: [
    {
      productSlug: 'indian-honey',
      image: '/images/hero/indian-honey.png',
      tagline: 'Golden goodness, every day',
    },
    {
      productSlug: 'kashmir-honey',
      image: '/images/hero/kashmir-honey.png',
      tagline: 'Made for warm moments',
    },
    {
      productSlug: 'litchi-honey',
      image: '/images/hero/litchi-honey.png',
      tagline: 'Soft, fruity & fragrant',
    },
    {
      productSlug: 'acacia-honey',
      image: '/images/hero/acacia-honey.png',
      tagline: 'Gently sweet & smooth',
    },
  ],
};

// Icons here are custom drawings: 'varieties', 'flavours', 'packaging' or 'whatsapp'
// (see src/components/home/FeatureIcon.jsx).
export const whyChooseUsContent = {
  eyebrow: 'Best feature',
  heading: 'We Provide The Best Quality',
  items: [
    {
      icon: 'varieties',
      title: 'Selected Varieties',
      text: 'Seven honey varieties, from gentle Acacia to bold Forest honey, so there is one for every taste.',
    },
    {
      icon: 'flavours',
      title: 'Distinctive Flavours',
      text: 'Every variety has its own colour, texture and character for you to discover.',
    },
    {
      icon: 'packaging',
      title: 'Thoughtful Packaging',
      text: 'Choose a round jar, square jar or bottle for every honey in our collection.',
    },
    {
      icon: 'whatsapp',
      title: 'Easy WhatsApp Ordering',
      text: 'Build your cart and send your order in one tap. Our team confirms everything with you personally.',
    },
  ],
};

export const brandStoryContent = {
  eyebrow: 'Our Story',
  heading: 'A Sweet Connection With Nature.',
  paragraphs: [
    'Indian Honey Park has been processing and packing honey since 1990, and earned AGMARK Approval from the Government of India in 2004.',
    'We procure pure, natural honey from the forest regions of Nilambur, Kerala. Every batch is vacuum processed to preserve its natural flavour and aroma, and tested in AGMARK-approved laboratories before packing.',
  ],
  image: '/images/lifestyle/story.svg',
  imageAlt: 'Illustration of a honey jar among flowers and honeycomb',
  buttonLabel: 'About Us',
  buttonLink: '/about',
};

export const howToOrderContent = {
  eyebrow: 'How to Order',
  heading: 'Three simple steps to your honey.',
  steps: [
    {
      icon: 'Search',
      title: 'Choose Your Honey',
      text: 'Browse our seven varieties and pick the bottle option that suits you.',
    },
    {
      icon: 'ShoppingBag',
      title: 'Add Products to Cart',
      text: 'Add as many honeys as you like and adjust quantities in your cart.',
    },
    {
      icon: 'MessageCircle',
      title: 'Order Through WhatsApp',
      text: 'Send your order on WhatsApp. We confirm availability, delivery and payment with you.',
    },
  ],
};

/*
  TESTIMONIALS
  Only add real reviews from real customers (with their permission).
  While this list is empty, the section shows a friendly "reviews coming soon" message.
  Example:
  { name: 'Customer name', location: 'City', quote: 'What they said…' },
*/
export const testimonials = [];

export const faqs = [
  {
    question: 'How do I place an order?',
    answer:
      'Add the honey you would like to your cart, then tap "Place Order on WhatsApp". Fill in your name, phone number and address, and WhatsApp opens with your order ready to send.',
  },
  {
    question: 'Is my order confirmed once WhatsApp opens?',
    answer:
      'Not yet. Your order is confirmed only after you send the message and our team replies to confirm availability, delivery charges and the final amount.',
  },
  {
    question: 'Where do you deliver, and how long does it take?',
    answer:
      'Delivery areas, timelines and charges depend on your location. We confirm these with you on WhatsApp before your order is finalised.',
  },
  {
    question: 'What bottle options are available?',
    answer:
      'Each honey is available in three bottle options. You can see the options and their prices on every product page.',
  },
  {
    question: 'How do I pay?',
    answer:
      'There is no online payment on this website. Once your order is confirmed, we share payment details with you directly on WhatsApp.',
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'Message us on WhatsApp or use the details on our Contact page. We are happy to help with product questions and orders.',
  },
];
