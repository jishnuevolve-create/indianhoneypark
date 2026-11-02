import { formatPrice, hasPrice, PRICE_ON_REQUEST } from '../../utils/currency';

// Shows a formatted price, or a softer "Price on request" when no price is set.
function Price({ amount, prefix = '', className = '' }) {
  if (!hasPrice(amount)) {
    return <span className={`text-sm text-ink-soft italic ${className}`}>{PRICE_ON_REQUEST}</span>;
  }
  return (
    <span className={`font-semibold text-ink tabular-nums ${className}`}>
      {prefix}
      {formatPrice(amount)}
    </span>
  );
}

export default Price;
