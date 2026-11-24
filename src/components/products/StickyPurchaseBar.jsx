import { ShoppingBag } from 'lucide-react';
import { getVariantDisplayName } from '../../utils/productUtils';
import Button from '../common/Button';
import SocialIcon from '../common/SocialIcon';
import Price from './Price';

// Fixed order bar at the bottom of the screen on phones (hidden on large screens).
function StickyPurchaseBar({ productName, selectedVariant, onAddToCart, onWhatsAppOrder }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-warm-white/95 px-4 py-3 shadow-[0_-12px_30px_-20px_rgb(38_35_29/0.4)] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{productName}</p>
          <p className="truncate text-xs text-ink-soft">
            {getVariantDisplayName(selectedVariant)} · <Price amount={selectedVariant?.price} />
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onAddToCart}
          disabled={!selectedVariant}
          aria-label="Add to Cart"
          className="size-[52px] shrink-0 px-0!"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
        </Button>
        <Button variant="whatsapp" onClick={onWhatsAppOrder} disabled={!selectedVariant}>
          <SocialIcon name="whatsapp" className="size-5" />
          Order
        </Button>
      </div>
    </div>
  );
}

export default StickyPurchaseBar;
