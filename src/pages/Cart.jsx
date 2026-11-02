import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import WhatsAppCheckout from '../components/cart/WhatsAppCheckout';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import PageHeader from '../components/layout/PageHeader';
import { useCart } from '../hooks/useCart';
import { usePageMeta } from '../hooks/usePageMeta';

// Full-page cart with the checkout form beside it (stacked on phones).
function Cart() {
  usePageMeta('Your Cart', 'Review your honey order and send it on WhatsApp.');
  const { cartItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="Cart"
          title="Your cart is empty"
          description="Find a honey you love and add it to your cart."
        >
          <div className="mt-8 flex justify-center">
            <Button to="/shop">
              <ShoppingBag className="size-4" aria-hidden="true" />
              Explore Collection
            </Button>
          </div>
        </PageHeader>
        <div className="pb-24" />
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Cart" title="Your Cart" />
      <Container className="grid gap-10 pb-24 lg:grid-cols-12 lg:gap-14">
        <section aria-label="Cart items" className="lg:col-span-7">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {cartItems.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Continue shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="cursor-pointer font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Clear cart
            </button>
          </div>
        </section>

        <aside aria-label="Order summary and checkout" className="lg:col-span-5">
          <div className="space-y-8 rounded-[2rem] bg-cream p-6 sm:p-8 lg:sticky lg:top-28">
            <CartSummary />
            <div className="border-t border-ink/10 pt-8">
              <WhatsAppCheckout />
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}

export default Cart;
