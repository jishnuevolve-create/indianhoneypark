import { ShoppingBag, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import Button from '../common/Button';
import Drawer from '../common/Drawer';
import SocialIcon from '../common/SocialIcon';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import WhatsAppCheckout from './WhatsAppCheckout';

// Slide-out cart. Step 1 shows the items, step 2 collects delivery details.
function CartDrawer() {
  const { cartItems, cartCount, isCartOpen, closeCart } = useCart();
  const [step, setStep] = useState('items');

  const handleClose = useCallback(() => {
    closeCart();
    setStep('items');
  }, [closeCart]);

  const isEmpty = cartItems.length === 0;

  return (
    <Drawer isOpen={isCartOpen} onClose={handleClose} side="right" label="Shopping cart">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
        <h2 className="text-2xl">
          Your Cart{' '}
          {cartCount > 0 && (
            <span className="font-sans text-base text-ink-soft">({cartCount})</span>
          )}
        </h2>
        <button
          type="button"
          onClick={handleClose}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-cream"
          aria-label="Close cart"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      {isEmpty && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-soft-yellow">
            <ShoppingBag className="size-8 text-amber" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-2xl">Your cart is empty</p>
            <p className="mt-2 text-sm text-ink-soft">Find a honey you love and add it here.</p>
          </div>
          <Button to="/shop" onClick={handleClose}>
            Explore Collection
          </Button>
        </div>
      )}

      {!isEmpty && step === 'items' && (
        <>
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5 sm:px-6">
            {cartItems.map((item) => (
              <CartItem key={item.cartItemId} item={item} onProductLinkClick={handleClose} />
            ))}
          </ul>
          <div className="space-y-4 border-t border-ink/10 bg-cream/60 px-5 py-5 sm:px-6">
            <CartSummary />
            <Button variant="whatsapp" size="lg" fullWidth onClick={() => setStep('checkout')}>
              <SocialIcon name="whatsapp" className="size-5" />
              Checkout on WhatsApp
            </Button>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer font-medium text-ink-soft hover:text-ink"
              >
                Continue shopping
              </button>
              <Link
                to="/cart"
                onClick={handleClose}
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                View full cart
              </Link>
            </div>
          </div>
        </>
      )}

      {!isEmpty && step === 'checkout' && (
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <WhatsAppCheckout onBack={() => setStep('items')} />
        </div>
      )}
    </Drawer>
  );
}

export default CartDrawer;
