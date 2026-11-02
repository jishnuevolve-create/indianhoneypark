/*
  PRODUCT CATALOGUE
  This is the only place product information is stored.

  HOW TO EDIT
  - price: a number in rupees (e.g. 349). Use null while the price is not decided —
    the site will show "Price on request" instead of a fake number.
  - size: the pack size shown to customers (e.g. '250 g'). Leave '' until confirmed.
  - images: the product gallery. The first image is used on product cards.
  - featured: true shows the product in the homepage "Featured Products" grid.
  - tint: soft background colour used behind the bottle on cards.

  Descriptions below are general placeholders. Replace them with your own approved wording.
*/

/*
  Most honeys come in the same three containers, each with its own photo in
  public/images/products/, named  <product-slug>-<container-id>.webp
  e.g. litchi-honey-round-jar.webp
*/
const CONTAINERS = [
  { id: 'round-jar', label: 'Round Jar' },
  { id: 'square-jar', label: 'Square Jar' },
  { id: 'bottle', label: 'Bottle' },
];

function getContainerPhoto(slug, containerId) {
  return `/images/products/${slug}-${containerId}.webp`;
}

// All three container photos for a product, used as its gallery.
function createContainerGallery(slug) {
  return CONTAINERS.map((container) => getContainerPhoto(slug, container.id));
}

// Builds the three bottle options, taking each one's size and price from `sizesAndPrices`.
function createContainerVariants(slug, sizesAndPrices) {
  return CONTAINERS.map((container) => ({
    id: container.id,
    label: container.label,
    size: sizesAndPrices[container.id]?.size ?? '',
    price: sizesAndPrices[container.id]?.price ?? null,
    image: getContainerPhoto(slug, container.id),
  }));
}

const STORAGE_NOTE = 'Store at room temperature, away from direct sunlight.';

export const products = [
  {
    id: 'indian-honey',
    slug: 'indian-honey',
    name: 'Indian Honey',
    shortDescription: 'Our signature honey, golden and versatile for every day.',
    description:
      'Our signature honey is a warm, golden everyday companion. Stir it into tea, drizzle it over breakfast, or enjoy a spoonful on its own.',
    images: createContainerGallery('indian-honey'),
    tint: '#FFF1C5',
    featured: true,
    details: [
      { label: 'Variety', value: 'Signature honey' },
      { label: 'Best enjoyed with', value: 'Tea, toast, breakfast bowls' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    // Fill in each container's size (e.g. '500 g') and price (e.g. 450) when confirmed.
    variants: createContainerVariants('indian-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
  {
    id: 'kashmir-honey',
    slug: 'kashmir-honey',
    name: 'Kashmir Honey',
    shortDescription: 'A delicate honey for warm drinks and desserts.',
    description:
      'A delicate honey variety. Lovely in warm drinks and as a finishing drizzle on desserts.',
    images: createContainerGallery('kashmir-honey'),
    tint: '#FDF0CF',
    featured: true,
    details: [
      { label: 'Variety', value: 'Kashmir honey' },
      { label: 'Best enjoyed with', value: 'Warm drinks, desserts' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    // Sizes are taken from the labels. Add prices when confirmed.
    variants: createContainerVariants('kashmir-honey', {
      'round-jar': { size: '500 g', price: null },
      'square-jar': { size: '250 g', price: null },
      bottle: { size: '250 g', price: null },
    }),
  },
  {
    id: 'acacia-honey',
    slug: 'acacia-honey',
    name: 'Acacia Honey',
    shortDescription: 'A smooth honey with a gentle, mild sweetness.',
    description:
      'Acacia honey is loved for its smooth texture and gentle sweetness, making it an easy everyday choice.',
    images: createContainerGallery('acacia-honey'),
    tint: '#E8EFDF', // brand sage
    featured: true,
    details: [
      { label: 'Variety', value: 'Acacia honey' },
      { label: 'Best enjoyed with', value: 'Tea, yoghurt, salad dressings' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    variants: createContainerVariants('acacia-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
  {
    id: 'litchi-honey',
    slug: 'litchi-honey',
    name: 'Litchi Honey',
    shortDescription: 'A fragrant variety with a soft, fruity character.',
    description:
      'Litchi honey has a soft, fruity character. Enjoy it with fruit, pancakes or in a refreshing drink.',
    images: createContainerGallery('litchi-honey'),
    tint: '#FDECD2',
    featured: true,
    details: [
      { label: 'Variety', value: 'Litchi honey' },
      { label: 'Best enjoyed with', value: 'Fruit, pancakes, cool drinks' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    variants: createContainerVariants('litchi-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
  {
    id: 'forest-honey',
    slug: 'forest-honey',
    name: 'Forest Honey',
    shortDescription: 'Deep amber honey with a rich, bold flavour.',
    description:
      'Forest honey is darker in colour with a richer, bolder taste. A wonderful pairing for breads and baking.',
    images: createContainerGallery('forest-honey'),
    tint: '#E3EADF',
    featured: false,
    details: [
      { label: 'Variety', value: 'Forest honey' },
      { label: 'Best enjoyed with', value: 'Breads, baking, marinades' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    variants: createContainerVariants('forest-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
  {
    id: 'drip-honey',
    slug: 'drip-honey',
    name: 'Drip Honey',
    shortDescription: 'A smooth-flowing honey made for drizzling.',
    description:
      'Drip Honey flows smoothly, so you can drizzle exactly as much as you like over pancakes, waffles or oats.',
    images: createContainerGallery('drip-honey'),
    tint: '#FDEBCB',
    featured: false,
    details: [
      { label: 'Variety', value: 'Drip honey' },
      { label: 'Best enjoyed with', value: 'Pancakes, waffles, oats' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    variants: createContainerVariants('drip-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
  {
    id: 'soft-cream-honey',
    slug: 'soft-cream-honey',
    name: 'Soft Cream Honey',
    shortDescription: 'A mellow, light honey with a soft, creamy character.',
    description:
      'Soft Cream Honey is light in colour with a mellow, gentle taste — lovely on toast or stirred into warm milk.',
    images: createContainerGallery('soft-cream-honey'),
    tint: '#F8F1DF',
    featured: false,
    details: [
      { label: 'Variety', value: 'Soft cream honey' },
      { label: 'Best enjoyed with', value: 'Toast, crackers, warm milk' },
      { label: 'Storage', value: STORAGE_NOTE },
    ],
    variants: createContainerVariants('soft-cream-honey', {
      'round-jar': { size: '', price: null },
      'square-jar': { size: '', price: null },
      bottle: { size: '', price: null },
    }),
  },
];

// Shown on every product page under "Delivery information".
export const deliveryInformation = [
  'Delivery areas, timelines and charges are confirmed on WhatsApp when you place your order.',
  'Your order is only confirmed after our team replies to you on WhatsApp.',
  'Payment details are shared on WhatsApp once availability is confirmed.',
];
