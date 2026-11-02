import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Use this in any component that needs the cart: const { cartItems, addToCart } = useCart();
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used inside <CartProvider>.');
  }
  return cart;
}
