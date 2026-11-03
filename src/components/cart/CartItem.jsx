import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import {
  getProductImage,
  getThumbnailImageProps,
  getVariantDisplayName,
} from '../../utils/productUtils';
import SafeImage from '../common/SafeImage';
import Price from '../products/Price';
import QuantitySelector from '../products/QuantitySelector';

// One line in the cart: picture, name, bottle option, quantity and subtotal.
function CartItem({ item, onProductLinkClick }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, variant, quantity, unitPrice, subtotal, cartItemId } = item;
  const productUrl = `/products/${product.slug}`;

  return (
    <li className="flex gap-4 py-5">
      <Link
        to={productUrl}
        onClick={onProductLinkClick}
        className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:size-24"
        style={{ backgroundColor: product.tint }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          {...getThumbnailImageProps(getProductImage(product, variant))}
          alt=""
          className="size-full object-contain p-1.5"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={productUrl}
              onClick={onProductLinkClick}
              className="font-display text-lg leading-tight hover:text-amber-dark"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-ink-soft">
              {getVariantDisplayName(variant)} ·{' '}
              <Price amount={unitPrice} className="text-sm font-normal" />
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(cartItemId)}
            className="-m-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
            aria-label={`Remove ${product.name} (${getVariantDisplayName(variant)}) from cart`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <QuantitySelector
            quantity={quantity}
            onChange={(newQuantity) => updateQuantity(cartItemId, newQuantity)}
            size="sm"
            label={`quantity of ${product.name}`}
          />
          {/* "Price on request" is already shown above, so only show a real subtotal here. */}
          {subtotal !== null && <Price amount={subtotal} />}
        </div>
      </div>
    </li>
  );
}

export default CartItem;
