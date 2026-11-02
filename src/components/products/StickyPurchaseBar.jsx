import { ShoppingBag } from 'lucide-react';
import { getVariantDisplayName } from '../../utils/productUtils';
import Button from '../common/Button';
import Price from './Price';

// Fixed "Add to Cart" bar at the bottom of the screen on phones (hidden on large screens).
function StickyPurchaseBar({ productName, selectedVariant, onAddToCart }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-warm-white/95 px-4 py-3 shadow-[0_-12px_30px_-20px_rgb(38_35_29/0.4)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{productName}</p>
          <p className="truncate text-xs text-ink-soft">
            {getVariantDisplayName(selectedVariant)} · <Price amount={selectedVariant?.price} />
          </p>
        </div>
        <Button onClick={onAddToCart} disabled={!selectedVariant}>
          <ShoppingBag className="size-4" aria-hidden="true" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default StickyPurchaseBar;
