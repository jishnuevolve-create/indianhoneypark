# Indian Honey — E-commerce Website

A premium, mobile-friendly honey shop built with React. Customers browse seven honey varieties, choose a bottle option, add products to a cart and **send their order on WhatsApp**. There is no online payment: the team confirms availability, delivery and payment in the WhatsApp chat.

---

## Technologies

| Tool               | What it does here                                                |
| ------------------ | ---------------------------------------------------------------- |
| React 19 + Vite    | Builds the website                                               |
| React Router       | Page addresses such as `/shop`, `/products/forest-honey`         |
| Tailwind CSS v4    | Styling                                                          |
| Lucide React       | Icons                                                            |
| React Context      | Shares the shopping cart across the site                         |
| localStorage       | Remembers the cart after a page refresh                          |
| WhatsApp (`wa.me`) | Sends the order message                                          |
| ESLint + Prettier  | Code checking and formatting                                     |
| Lenis              | Smooth mouse-wheel scrolling                                     |
| Fontsource         | Fraunces, DM Sans and Satisfy fonts, served from the site itself |

---

## Getting started

You need [Node.js](https://nodejs.org) version 20 or newer.

```bash
npm install          # first time only: installs everything
npm run dev          # starts the site at http://localhost:5173
```

Other commands:

```bash
npm run build        # creates the production website in the dist/ folder
npm run preview      # previews the production build locally
npm run lint         # checks the code for mistakes
npm run format       # tidies the code formatting
```

> `npm run dev` is the development version: React adds extra checks, so scrolling and animations feel heavier than on the real site. To judge real speed, run `npm run build` and then `npm run preview`.

---

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output folder `dist`). Click **Deploy**.

`vercel.json` makes sure that addresses like `/products/kashmir-honey` work when someone opens them directly or refreshes the page.

After you deploy, set `siteUrl` in `src/data/siteConfig.js` to your real domain.

## GitHub Pages

The site is also published at **https://jishnuevolve-create.github.io/indianhoneypark/**.

- Every push to the `main` branch rebuilds and republishes it automatically (`.github/workflows/deploy-pages.yml`). Progress is visible in the repository's **Actions** tab.
- One-time setting: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- Because this address has a sub-folder (`/indianhoneypark/`), the workflow builds with `BASE_PATH=/indianhoneypark/`. Image paths in the code start with `/images/...` and are adjusted automatically by `src/utils/assetUrl.js`. Vercel and local development use `/` and need nothing extra.

---

## Folder structure

```text
public/images/        Images (products, hero jars, story, logo)
src/
  components/
    common/           Reusable pieces: Button, Container, Drawer, SafeImage, WhatsAppButton…
    layout/           Header, Navbar, MobileMenu, SearchDialog, Footer, Layout, PageHeader
    home/             One file per homepage section (Hero, Categories, FAQ…)
    products/         ProductCard, CategoryCard, VariantSelector, QuantitySelector, Gallery…
    cart/             CartDrawer, CartItem, CartSummary, WhatsAppCheckout
  pages/              One file per page (Home, Shop, ProductDetails, Cart, About, Contact, Policy, NotFound)
  context/            CartContext (cart state), ToastContext (pop-up messages)
  hooks/              Reusable logic (useCart, useLocalStorage, useProductSelection, useWhatsApp…)
  data/               ALL editable content: products, site settings, homepage text, policies
  utils/              Plain helper functions: prices, cart maths, WhatsApp messages
  styles/globals.css  Brand colours, fonts and animations
```

**Rule of thumb:** to change _content_, edit files in `src/data/`. To change _how things look or work_, edit the components.

---

## Everyday tasks

### Update the WhatsApp number ⚠️ do this first

Open `src/data/siteConfig.js` and set:

```js
whatsappNumber: '919876543210',
```

Use the country code + number, digits only (`91` for India, followed by the 10-digit mobile number). Until this is set, WhatsApp buttons show a friendly "not set up yet" message instead of opening WhatsApp.

The phone, email, address, opening hours and social media links are in the same file. Anything left as `''` is hidden.

### Change a product price or bottle size

Open `src/data/products.js`. Every honey comes in three containers (Round Jar, Square Jar, Bottle), and each product has a short block like this:

```js
variants: createContainerVariants('kashmir-honey', {
  'round-jar': { size: '500 g', price: 650 },
  'square-jar': { size: '250 g', price: 340 },
  bottle: { size: '250 g', price: 320 },
}),
```

- `size` is the text shown to customers, such as `'500 g'`.
- `price` is a number in rupees, without the ₹ sign or quotes. Leave it as `null` to show **"Price on request"**.
- Once every item in a cart has a price, the cart and the WhatsApp message show a total automatically.

### Containers and photos

Each container has its own photo in `public/images/products/`, named `<product-slug>-<container>.webp`, for example `kashmir-honey-round-jar.webp`. Choosing a container on the product page shows its photo.

- **Replace a photo:** save the new image over the old file with exactly the same name.
- **Add or rename a container type** (for example a gift pack): edit the `CONTAINERS` list at the top of `products.js`, and add a matching photo for every product.

> If you rename or remove a container `id`, customers who already had it in their cart will have that item quietly removed. This is intentional, so the cart never shows a product that no longer exists.

Photo tips: use square images (1200×1200 px works well) with a transparent background, saved as WebP. You can convert and compress them at [squoosh.app](https://squoosh.app).

**Small copies for speed:** next to every product photo there is a 600×600 px copy ending in `-600.webp` (e.g. `kashmir-honey-bottle-600.webp`). Product cards, the cart and search use these so pages load faster. When you add or replace a photo, also save a 600 px copy with that name. If you forget, the site still works, it just loads the larger photo instead.

**Hero jars:** each hero PNG in `public/images/hero/` also has two light WebP copies (`indian-honey.webp` at 900 px and `indian-honey-600.webp` at 600 px). Browsers use the WebP copies; the PNG is the fallback. Update all three together.

**Story photo:** the "Our Story" section and the About page use `public/images/lifestyle/honeycomb.webp` (1200 px) and `honeycomb-600.webp` (a lighter copy for phones). To change the photo, replace both files and keep the names, or change `image` and `imageSrcSet` in `homeContent.js` and `pageContent.js`. Use a square photo.

### Add a new honey product

Copy one product block in `src/data/products.js`, paste it at the end of the list and change:

- `id` and `slug`: lowercase with dashes, such as `'tulsi-honey'` (the slug becomes the address `/products/tulsi-honey`)
- `name`, `shortDescription`, `description`, `details`
- the slug inside `createContainerGallery('…')` and `createContainerVariants('…', …)`
- `tint` (card background colour)
- `featured: true` to show it in the homepage Featured section

Then add its three photos to `public/images/products/`, named `tulsi-honey-round-jar.webp`, `tulsi-honey-square-jar.webp` and `tulsi-honey-bottle.webp`.

It then appears in the shop, search, footer and related products automatically.

### Edit homepage content

`src/data/homeContent.js` contains the hero text, "Why Choose Us" items, brand story, ordering steps, testimonials and FAQs.

**Hero jars:** the hero stays on screen while visitors scroll and shows one jar after another, then the page scrolls on normally. The jars are listed under `heroContent.slides`, each with its handwritten `tagline`. The product name and description beside each jar come from `products.js`. Each jar image is a transparent PNG in `public/images/hero/`; keep them square, about 900×900 px. To change how much scrolling each jar gets, edit `SCROLL_PER_SLIDE_VH` in `src/components/home/Hero.jsx`.

To reorder or remove whole sections, edit `src/pages/Home.jsx`.

**Testimonials:** only add real reviews from real customers, with their permission. Each review has a `product`, `rating`, `quote`, `name` and `location`. If the list is empty, a "reviews coming soon" message is shown.

The announcement bar text is in `siteConfig.js → announcement` (set `enabled: false` to hide it).

### Edit About, Contact and policy pages

`src/data/pageContent.js`. The shipping, privacy and terms text are placeholders. Replace them with your approved policies.

### Change brand colours or fonts

`src/styles/globals.css`, in the `@theme` block at the top. Fonts are loaded in `src/main.jsx` (self-hosted, no Google Fonts request).

### Scrolling and effects

- **Smooth scrolling** (mouse wheel and trackpad): `src/utils/smoothScroll.js`. Lower `lerp` for a slower, floatier glide, raise it for a snappier one. Phones keep their natural touch scrolling.
- **Hero jars**: the jars move with the scroll. Each jar drifts gently, then hands over to the next while the progress bar ("01 ━━ ━━ ━━ ━━ 04") fills and the dotted ring turns, so scrolling always visibly does something. The timing of each hand-over is set in `src/utils/heroScroll.js` (`CHANGE_STARTS_AT` / `CHANGE_ENDS_AT`); the scroll length per jar is `SCROLL_PER_CHANGE_VH` in `Hero.jsx`. On computers, if a visitor stops half-way through a hand-over, the hero finishes it in the direction they were scrolling, so it never pulls against them (`SETTLE_DELAY_MS` in `Hero.jsx`). The Back button returns visitors to where they were on the previous page (`ScrollToTop.jsx`).
- **How to Order**: scrolls normally (not pinned); the steps light up and the gold line fills as they move up the screen (`src/hooks/useStepsProgress.js`).
- If the site is gliding somewhere by itself (back to top, a hero jar), pressing a scroll key or grabbing the scrollbar stops the glide immediately (`src/utils/smoothScroll.js`).
- **Story image parallax**: `useParallax(30)` in `src/components/home/BrandStory.jsx`. The number is how far the image drifts.
- **Floating buttons**: back-to-top, plus a WhatsApp button on phones, appear after the hero (`src/components/layout/FloatingActions.jsx`).
- **Fade-in on scroll**: wrap anything in `<Reveal>`.

All motion switches off automatically for visitors who have "reduce motion" turned on in their device settings.

---

## How the shopping cart works

- The cart lives in `src/context/CartContext.jsx`. Any component can use it via `useCart()`.
- Each cart line is identified by **product ID + variant ID** (for example `kashmir-honey__large`). That's why Kashmir Small and Kashmir Large are separate lines, while adding Kashmir Large twice increases its quantity.
- Only `{ productId, variantId, quantity }` is saved in the browser (localStorage). Names, images and prices are always read fresh from `products.js`, so price changes apply immediately.
- Quantities are always kept between 1 and 99.
- If the browser blocks storage, the cart still works for that visit and simply isn't remembered.

## How WhatsApp checkout works

1. The customer opens the cart and taps **Checkout on WhatsApp**.
2. They enter their name, phone number, address and optional notes. These details are **not saved** anywhere on the website.
3. **Place Order on WhatsApp** builds a formatted message (`src/utils/whatsapp.js`) listing each item, variant, quantity and price, the total when every price is known, and the customer details. The message is safely encoded into a `wa.me` link.
4. WhatsApp opens with the message ready. The customer reviews it and presses send.
5. The order is **not** treated as complete when WhatsApp opens. The cart is kept until the customer taps "I've sent my order — clear cart".

Each product also has a **Buy on WhatsApp** / **Quick order** button, which sends an enquiry for just that product, bottle and quantity.

---

## SEO notes (important to understand)

This is a client-rendered single-page app. Every page sets its own title and description (`src/hooks/usePageMeta.js`), and Google runs JavaScript, so it can read them. However:

- Some social networks (WhatsApp, Facebook link previews) only read `index.html`, so every shared link shows the default site title, description and image.
- If you later need per-page link previews or the strongest possible SEO, consider pre-rendering or moving to a framework with server rendering.

For a better link preview image, add a 1200×630 JPG to `public/images/` and update the `og:image` tag in `index.html`.
