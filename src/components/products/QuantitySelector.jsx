import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY, MIN_QUANTITY, sanitizeQuantity } from '../../utils/cartUtils';

const sizeStyles = {
  sm: { wrapper: 'h-10', button: 'w-9', input: 'w-8 text-sm' },
  md: { wrapper: 'h-[52px]', button: 'w-11', input: 'w-10 text-base' },
};

// − [ 2 ] + control. Always keeps the value between 1 and 99.
function QuantitySelector({ quantity, onChange, size = 'md', label = 'quantity', className = '' }) {
  const styles = sizeStyles[size];

  function handleInputChange(event) {
    // Ignore the empty field while the customer is still typing a new number.
    if (event.target.value === '') return;
    onChange(sanitizeQuantity(event.target.value));
  }

  return (
    <div
      className={`inline-flex shrink-0 items-center rounded-full border border-ink/15 bg-surface ${styles.wrapper} ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= MIN_QUANTITY}
        className={`flex h-full cursor-pointer items-center justify-center rounded-l-full text-ink transition-colors hover:text-amber disabled:cursor-not-allowed disabled:opacity-30 ${styles.button}`}
        aria-label={`Decrease ${label}`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
        value={quantity}
        onChange={handleInputChange}
        onFocus={(event) => event.target.select()}
        aria-label={label}
        className={`[appearance:textfield] bg-transparent text-center font-semibold tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${styles.input}`}
      />
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= MAX_QUANTITY}
        className={`flex h-full cursor-pointer items-center justify-center rounded-r-full text-ink transition-colors hover:text-amber disabled:cursor-not-allowed disabled:opacity-30 ${styles.button}`}
        aria-label={`Increase ${label}`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantitySelector;
