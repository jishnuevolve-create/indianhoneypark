import { useCart } from '../../hooks/useCart';
import { formatPrice, hasPrice } from '../../utils/currency';

// Item count and order total. If any item has no price, no fake total is shown.
function CartSummary() {
  const { cartCount, cartTotal } = useCart();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-ink-soft">
        <span>Items</span>
        <span className="tabular-nums">{cartCount}</span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium">Total</span>
        {hasPrice(cartTotal) ? (
          <span className="font-display text-2xl tabular-nums">{formatPrice(cartTotal)}</span>
        ) : (
          <span className="text-right text-sm text-ink-soft italic">Confirmed on WhatsApp</span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-ink-soft">
        {hasPrice(cartTotal)
          ? 'Delivery charges and the final amount are confirmed on WhatsApp.'
          : 'Some items are price on request. We will confirm the final amount and delivery charges on WhatsApp.'}
      </p>
    </div>
  );
}

export default CartSummary;
