import { siteConfig } from '../data/siteConfig';

const { locale, code } = siteConfig.currency;
const wholeNumberFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: code,
  maximumFractionDigits: 0,
});
const decimalFormatter = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: code,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const PRICE_ON_REQUEST = 'Price on request';

// A price is only "real" if it is a positive number. null, '' or 0 mean "not set yet".
export function hasPrice(price) {
  return typeof price === 'number' && Number.isFinite(price) && price > 0;
}

// Returns e.g. "₹349" or "₹349.50", or "Price on request" when no price is set.
export function formatPrice(price) {
  if (!hasPrice(price)) return PRICE_ON_REQUEST;
  return Number.isInteger(price)
    ? wholeNumberFormatter.format(price)
    : decimalFormatter.format(price);
}
