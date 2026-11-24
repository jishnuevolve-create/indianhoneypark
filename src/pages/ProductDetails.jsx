import {
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Leaf,
  MessageCircle,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import SectionHeading from '../components/common/SectionHeading';
import SocialIcon from '../components/common/SocialIcon';
import CategoryCard from '../components/products/CategoryCard';
import Price from '../components/products/Price';
import ProductGallery from '../components/products/ProductGallery';
import QuantitySelector from '../components/products/QuantitySelector';
import StickyPurchaseBar from '../components/products/StickyPurchaseBar';
import VariantSelector from '../components/products/VariantSelector';
import { faqs, testimonials } from '../data/homeContent';
import { deliveryInformation } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { useProductSelection } from '../hooks/useProductSelection';
import { getProductBySlug, getProductImage, getRelatedProducts } from '../utils/productUtils';
import NotFound from './NotFound';

// Short reasons to trust the product, shown next to the buy buttons (from the company introduction).
const trustPoints = [
  { icon: Award, title: 'AGMARK approved', text: 'Government of India approval since 2004' },
  { icon: FlaskConical, title: 'Lab tested', text: 'Every batch checked for purity' },
  { icon: Leaf, title: 'Natural & pure', text: 'Vacuum processed, nothing artificial' },
  { icon: MessageCircle, title: 'Easy ordering', text: 'Order in one tap on WhatsApp' },
];

const orderSteps = [
  'Choose your bottle',
  'Send the order on WhatsApp',
  'We confirm delivery & payment',
];

// A collapsible section (native <details>, so it works without extra code).
function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-ink/10 bg-surface [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold">
        {title}
        <ChevronDown
          className="size-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}

function Stars({ count = 5, className = 'size-4' }) {
  return Array.from({ length: count }, (_, index) => (
    <Star key={index} className={`${className} fill-honey text-honey`} aria-hidden="true" />
  ));
}

function ProductDetailsContent({ product }) {
  const {
    variants,
    selectedVariant,
    selectVariant,
    quantity,
    changeQuantity,
    handleAddToCart,
    handleWhatsAppOrder,
  } = useProductSelection(product);

  // All product photos plus any bottle photos, each shown once, in a fixed order.
  const galleryImages = [
    ...new Set([...(product.images || []), ...variants.map((variant) => variant.image)]),
  ].filter(Boolean);
  const relatedProducts = getRelatedProducts(product);
  const reviews = testimonials.filter((review) => review.product === product.name);

  // Clicking a bottle's photo in the gallery selects that bottle option too.
  function handleGalleryImageSelect(image) {
    const matchingVariant = variants.find((variant) => variant.image === image);
    if (matchingVariant) selectVariant(matchingVariant.id);
  }

  return (
    <div className="pb-28 lg:pb-0">
      <Container className="pt-6 pb-16 lg:pt-10 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 lg:mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
            <li className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </li>
            <li className="flex items-center gap-1.5">
              <Link to="/shop" className="hover:text-ink">
                Shop
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* The key makes the gallery jump to the new bottle's photo when the option changes. */}
            <ProductGallery
              key={selectedVariant?.id}
              images={galleryImages}
              initialImage={getProductImage(product, selectedVariant)}
              onImageSelect={handleGalleryImageSelect}
              productName={product.name}
              tint={product.tint}
            />
          </div>

          <div className="animate-fade-up">
            <p className="eyebrow">Indian Honey</p>
            <h1 className="mt-2">{product.name}</h1>

            {/* Social proof: stars from real customer reviews of this honey */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {reviews.length > 0 && (
                <a
                  href="#customer-reviews"
                  className="flex items-center gap-2 text-ink-soft hover:text-ink"
                >
                  <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                    <Stars />
                  </span>
                  <span>
                    {reviews.length} customer {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </a>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-botanical/10 px-3 py-1 text-xs font-semibold text-botanical">
                <Award className="size-3.5" aria-hidden="true" />
                AGMARK approved
              </span>
            </div>

            <div className="mt-5 text-2xl" aria-live="polite">
              <Price amount={selectedVariant?.price} className="text-2xl" />
            </div>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{product.description}</p>

            <ul className="mt-5 space-y-2">
              {[
                'Pure, natural honey from the forests of Nilambur, Kerala',
                'Vacuum processed to keep its natural flavour and aroma',
                'Tested in AGMARK-approved laboratories before packing',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-honey/25 text-amber-dark">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-5 border-t border-ink/10 pt-7">
              <VariantSelector
                variants={variants}
                selectedVariantId={selectedVariant?.id}
                onSelect={selectVariant}
              />

              <div>
                <p className="mb-2 text-sm font-medium">Quantity</p>
                <QuantitySelector quantity={quantity} onChange={changeQuantity} />
              </div>

              {/* WhatsApp is how every order is placed, so it is the main button */}
              <div className="space-y-3">
                <Button
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  onClick={handleWhatsAppOrder}
                  disabled={!selectedVariant}
                  className="shadow-lift"
                >
                  <SocialIcon name="whatsapp" className="size-5" />
                  Order on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!selectedVariant}
                >
                  <ShoppingBag className="size-4" aria-hidden="true" />
                  Add to Cart
                </Button>
              </div>

              <p className="flex items-start gap-2 text-sm text-ink-soft">
                <Truck className="mt-0.5 size-4 shrink-0 text-botanical" aria-hidden="true" />
                No payment on the website. We confirm delivery and the final amount with you on
                WhatsApp.
              </p>
            </div>

            {/* Trust badges */}
            <ul className="mt-7 grid grid-cols-2 gap-3">
              {trustPoints.map(({ icon: TrustIcon, title, text }) => (
                <li key={title} className="flex gap-3 rounded-2xl bg-cream p-3.5 sm:p-4">
                  <TrustIcon
                    className="mt-0.5 size-5 shrink-0 text-amber-dark"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm leading-tight font-semibold">{title}</p>
                    <p className="mt-1 text-xs leading-snug text-ink-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* How ordering works */}
            <ol className="mt-5 flex items-start justify-between gap-2 rounded-2xl border border-ink/10 p-4 text-center">
              {orderSteps.map((step, index) => (
                <li key={step} className="flex flex-1 flex-col items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-honey text-xs font-bold text-ink">
                    {index + 1}
                  </span>
                  <span className="text-xs leading-snug text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-3">
              {product.details?.length > 0 && (
                <Accordion title="Product details" defaultOpen>
                  <dl className="divide-y divide-ink/10">
                    {product.details.map((detail) => (
                      <div key={detail.label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium">{detail.label}</dt>
                        <dd className="text-sm text-ink-soft sm:col-span-2">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Accordion>
              )}
              <Accordion title="Delivery & payment">
                <ul className="space-y-3">
                  {deliveryInformation.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-honey"
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Common questions">
                <div className="space-y-4">
                  {faqs.slice(0, 4).map((item) => (
                    <div key={item.question}>
                      <p className="text-sm font-semibold">{item.question}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>

      {reviews.length > 0 && (
        <section
          id="customer-reviews"
          aria-labelledby="product-reviews-heading"
          className="bg-cream py-16 lg:py-20"
        >
          <Container>
            <h2 id="product-reviews-heading" className="text-center text-3xl">
              What customers say about {product.name}
            </h2>
            <ul className="mx-auto mt-8 grid max-w-3xl gap-5">
              {reviews.map((review, index) => (
                <li key={`${review.name}-${index}`}>
                  <figure className="rounded-[1.75rem] bg-surface p-6 shadow-soft sm:p-8">
                    <div
                      className="flex gap-0.5"
                      role="img"
                      aria-label={`Rated ${review.rating} out of 5`}
                    >
                      <Stars count={review.rating} className="size-5" />
                    </div>
                    <blockquote className="mt-4 font-display text-xl leading-relaxed">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-semibold">{review.name}</span>
                      {review.location && (
                        <span className="text-ink-soft"> · {review.location}</span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="py-16 lg:py-24">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="You may also like"
              title="More From Our Collection"
            />
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <Reveal as="li" key={relatedProduct.id} delay={index * 80}>
                  <CategoryCard product={relatedProduct} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <StickyPurchaseBar
        productName={product.name}
        selectedVariant={selectedVariant}
        onAddToCart={handleAddToCart}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
    </div>
  );
}

// Reads the product from the URL (/products/kashmir-honey) and shows its page, or a 404.
function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  usePageMeta(product?.name || 'Product not found', product?.shortDescription);

  if (!product) {
    return <NotFound message="We couldn't find that honey. It may have moved or been renamed." />;
  }

  // The key resets the selected bottle and quantity when moving to another product.
  return <ProductDetailsContent key={product.id} product={product} />;
}

export default ProductDetails;
