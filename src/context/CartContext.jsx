import { createContext, useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  calculateCartTotal,
  createCartItemId,
  getCartItemCount,
  MAX_QUANTITY,
  resolveCartItems,
  sanitizeQuantity,
} from '../utils/cartUtils';

const CART_STORAGE_KEY = 'indian-honey-cart';

// Protects against broken data saved in the browser (e.g. edited by hand).
function asList(items) {
  return Array.isArray(items) ? items.filter((item) => item && typeof item === 'object') : [];
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

/*
  Stores the cart for the whole app.
  Only { productId, variantId, quantity } is saved — never customer details.
*/
export function CartProvider({ children }) {
  const [storedItems, setStoredItems] = useLocalStorage(CART_STORAGE_KEY, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Full cart lines (with product, variant and prices) built from the saved IDs.
  const cartItems = useMemo(() => resolveCartItems(storedItems), [storedItems]);
  const cartCount = useMemo(() => getCartItemCount(cartItems), [cartItems]);
  const cartTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  const addToCart = useCallback(
    (productId, variantId, quantity = 1) => {
      const cartItemId = createCartItemId(productId, variantId);
      const quantityToAdd = sanitizeQuantity(quantity);

      setStoredItems((currentItems) => {
        const safeItems = asList(currentItems);
        const alreadyInCart = safeItems.some(
          (item) => createCartItemId(item.productId, item.variantId) === cartItemId,
        );

        if (alreadyInCart) {
          return safeItems.map((item) =>
            createCartItemId(item.productId, item.variantId) === cartItemId
              ? {
                  ...item,
                  quantity: Math.min(MAX_QUANTITY, sanitizeQuantity(item.quantity) + quantityToAdd),
                }
              : item,
          );
        }
        return [...safeItems, { productId, variantId, quantity: quantityToAdd }];
      });
    },
    [setStoredItems],
  );

  const updateQuantity = useCallback(
    (cartItemId, newQuantity) => {
      setStoredItems((currentItems) =>
        asList(currentItems).map((item) =>
          createCartItemId(item.productId, item.variantId) === cartItemId
            ? { ...item, quantity: sanitizeQuantity(newQuantity) }
            : item,
        ),
      );
    },
    [setStoredItems],
  );

  const removeFromCart = useCallback(
    (cartItemId) => {
      setStoredItems((currentItems) =>
        asList(currentItems).filter(
          (item) => createCartItemId(item.productId, item.variantId) !== cartItemId,
        ),
      );
    },
    [setStoredItems],
  );

  const clearCart = useCallback(() => setStoredItems([]), [setStoredItems]);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
