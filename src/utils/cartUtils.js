import { hasPrice } from './currency';
import { getProductById, getVariantById } from './productUtils';

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

/*
  The same honey can be in the cart in different bottle sizes
  (e.g. Kashmir Honey Small AND Kashmir Honey Large).
  Combining the product ID and variant ID gives each of those its own cart line.
*/
export function createCartItemId(productId, variantId) {
  return `${productId}__${variantId}`;
}

// Turns any input (text, negative numbers, decimals) into a safe whole number between 1 and 99.
export function sanitizeQuantity(value) {
  const number = Math.floor(Number(value));
  if (!Number.isFinite(number)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, number));
}

/*
  The cart only saves IDs and quantities. Names, images and prices are looked up
  from products.js each time, so price changes apply immediately and products
  that were removed from the catalogue quietly drop out of the cart.
*/
export function resolveCartItems(storedItems) {
  if (!Array.isArray(storedItems)) return [];

  return storedItems
    .map((item) => {
      const product = getProductById(item?.productId);
      const variant = getVariantById(product, item?.variantId);
      if (!product || !variant) return null;

      const quantity = sanitizeQuantity(item.quantity);
      return {
        cartItemId: createCartItemId(product.id, variant.id),
        product,
        variant,
        quantity,
        unitPrice: hasPrice(variant.price) ? variant.price : null,
        subtotal: hasPrice(variant.price) ? variant.price * quantity : null,
      };
    })
    .filter(Boolean);
}

export function getCartItemCount(cartItems) {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// Returns null when any item has no price, because a partial total would be misleading.
export function calculateCartTotal(cartItems) {
  if (cartItems.length === 0) return 0;
  if (cartItems.some((item) => item.subtotal === null)) return null;
  return cartItems.reduce((total, item) => total + item.subtotal, 0);
}
