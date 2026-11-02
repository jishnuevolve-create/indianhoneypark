import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductSelection } from '../../hooks/useProductSelection';
import { getProductImage, getResponsiveImageProps } from '../../utils/productUtils';
import Button from '../common/Button';
import SafeImage from '../common/SafeImage';
import SocialIcon from '../common/SocialIcon';
import Price from './Price';
import QuantitySelector from './QuantitySelector';
import VariantSelector from './VariantSelector';

/*
  Shopping card with bottle choice, quantity, Add to Cart and WhatsApp quick order.
  Phones show two cards per row, so the card uses tighter spacing, hides the
  description and stacks the quantity and Add to Cart button there.
*/
function ProductCard({ product }) {
  const {
    variants,
    selectedVariant,
    selectVariant,
    quantity,
    changeQuantity,
    handleAddToCart,
    handleWhatsAppOrder,
  } = useProductSelection(product);

  const productUrl = `/products/${product.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-ink/5 transition duration-500 hover:shadow-lift sm:rounded-[1.75rem]">
      <Link
        to={productUrl}
        className="relative flex aspect-square items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.tint }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          {...getResponsiveImageProps(
            getProductImage(product, selectedVariant),
            '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw',
          )}
          alt=""
          className="h-[86%] w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5">
        <div>
          {/* Name, then price on its own line, so every card lines up the same way */}
          <h3 className="text-base sm:text-xl">
            <Link to={productUrl} className="transition-colors hover:text-amber">
              {product.name}
            </Link>
          </h3>
          <Price amount={selectedVariant?.price} className="mt-1 block text-xs sm:text-sm" />
          <p className="mt-2 line-clamp-2 hidden min-h-[2lh] text-sm leading-relaxed text-ink-soft sm:block">
            {product.shortDescription}
          </p>
        </div>

        <VariantSelector
          variants={variants}
          selectedVariantId={selectedVariant?.id}
          onSelect={selectVariant}
          compact
        />

        <div className="mt-auto space-y-2 pt-1 sm:space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <QuantitySelector
              quantity={quantity}
              onChange={changeQuantity}
              size="sm"
              className="justify-between sm:justify-start"
            />
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              className="px-3 sm:flex-1 sm:px-4"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              Add to Cart
            </Button>
          </div>
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            disabled={!selectedVariant}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-2 text-xs font-medium text-whatsapp transition-colors hover:bg-whatsapp/5 disabled:opacity-50 sm:gap-2 sm:text-sm"
          >
            <SocialIcon name="whatsapp" className="size-4 shrink-0" />
            <span className="sm:hidden">Order on WhatsApp</span>
            <span className="hidden sm:inline">Quick order on WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
