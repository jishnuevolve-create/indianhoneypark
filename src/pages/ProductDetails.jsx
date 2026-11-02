import { ChevronRight, ShoppingBag, Truck } from 'lucide-react';
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
import { deliveryInformation } from '../data/products';
import { usePageMeta } from '../hooks/usePageMeta';
import { useProductSelection } from '../hooks/useProductSelection';
import { getProductBySlug, getProductImage, getRelatedProducts } from '../utils/productUtils';
import NotFound from './NotFound';

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

  // Clicking a bottle's photo in the gallery selects that bottle option too.
  function handleGalleryImageSelect(image) {
    const matchingVariant = variants.find((variant) => variant.image === image);
    if (matchingVariant) selectVariant(matchingVariant.id);
  }

  return (
    <div className="pb-28 lg:pb-0">
      <Container className="pt-6 pb-20 lg:pt-10 lg:pb-28">
        <nav aria-label="Breadcrumb" className="mb-8">
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

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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
            <h1 className="mt-3">{product.name}</h1>
            <div className="mt-4 text-2xl" aria-live="polite">
              <Price amount={selectedVariant?.price} className="text-2xl" />
            </div>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-8 space-y-6 border-t border-ink/10 pt-8">
              <VariantSelector
                variants={variants}
                selectedVariantId={selectedVariant?.id}
                onSelect={selectVariant}
              />

              <div>
                <p className="mb-2 text-sm font-medium">Quantity</p>
                <div className="flex gap-3">
                  <QuantitySelector quantity={quantity} onChange={changeQuantity} />
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant}
                    className="min-w-0 flex-1 px-4 sm:px-7"
                  >
                    <ShoppingBag className="size-4" aria-hidden="true" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                onClick={handleWhatsAppOrder}
                disabled={!selectedVariant}
              >
                <SocialIcon name="whatsapp" className="size-5" />
                Buy on WhatsApp
              </Button>

              <p className="flex items-center gap-2 text-sm text-ink-soft">
                <Truck className="size-4 text-botanical" aria-hidden="true" />
                Delivery details and final amount are confirmed on WhatsApp.
              </p>
            </div>

            {product.details?.length > 0 && (
              <div className="mt-10 rounded-3xl bg-cream p-6 sm:p-8">
                <h2 className="text-2xl">Product details</h2>
                <dl className="mt-5 divide-y divide-ink/10">
                  {product.details.map((detail) => (
                    <div key={detail.label} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium">{detail.label}</dt>
                      <dd className="text-sm text-ink-soft sm:col-span-2">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-ink/10 p-6 sm:p-8">
              <h2 className="text-2xl">Delivery information</h2>
              <ul className="mt-4 space-y-3">
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
            </div>
          </div>
        </div>
      </Container>

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-cream py-20 lg:py-24">
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
