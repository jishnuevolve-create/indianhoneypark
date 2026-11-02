import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import { formatPrice, hasPrice } from '../../utils/currency';

function getOptionText(variant) {
  return variant.size ? `${variant.label} · ${variant.size}` : variant.label;
}

/*
  Bottle option picker.
  - Product page: large option buttons (real radio buttons, so they work with
    the keyboard and screen readers).
  - compact (product cards): a tidy dropdown, so every card has the same height
    however long the option names are.
*/
function VariantSelector({ variants, selectedVariantId, onSelect, compact = false }) {
  const groupName = useId();

  if (!variants || variants.length === 0) {
    return <p className="text-sm text-ink-soft">Bottle options will be available soon.</p>;
  }

  if (compact) {
    const selectedVariant =
      variants.find((variant) => variant.id === selectedVariantId) || variants[0];

    /*
      The real <select> is invisible and covers the styled box. It keeps 16px text
      (so phones don't zoom in when it's tapped), while the visible box can use
      smaller text that fits narrow cards.
    */
    return (
      <div>
        <label
          htmlFor={`${groupName}-select`}
          className="mb-1.5 block text-xs font-medium tracking-wide text-ink-soft uppercase"
        >
          Bottle
        </label>
        {/* Phones: size on a second line so long names fit. Larger screens: one line. */}
        <div className="relative flex h-11 items-center rounded-full border border-ink/15 bg-surface pr-8 pl-4 transition-colors hover:border-ink/35 has-[:focus-visible]:border-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber sm:h-10 sm:pr-9">
          <span
            className="flex min-w-0 flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-1"
            aria-hidden="true"
          >
            <span className="truncate text-[13px] font-medium text-ink sm:text-sm">
              {selectedVariant.label}
            </span>
            {selectedVariant.size && (
              <span className="truncate text-[11px] text-ink-soft sm:text-xs">
                <span className="hidden sm:inline">· </span>
                {selectedVariant.size}
              </span>
            )}
          </span>
          <select
            id={`${groupName}-select`}
            value={selectedVariant.id}
            onChange={(event) => onSelect(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer appearance-none rounded-full text-base opacity-0"
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {getOptionText(variant)}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">Bottle</legend>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <label key={variant.id} className="cursor-pointer">
            <input
              type="radio"
              name={groupName}
              value={variant.id}
              checked={variant.id === selectedVariantId}
              onChange={() => onSelect(variant.id)}
              className="peer sr-only"
            />
            <span className="flex min-h-12 flex-col items-center justify-center rounded-full border border-ink/15 px-5 text-sm text-ink transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber hover:border-ink/40">
              <span className="font-medium">
                {variant.label}
                {variant.size && <span className="opacity-70"> · {variant.size}</span>}
              </span>
              {hasPrice(variant.price) && (
                <span className="text-xs opacity-70">{formatPrice(variant.price)}</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default VariantSelector;
