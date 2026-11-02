import { ArrowLeft, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { generateCartOrderMessage } from '../../utils/whatsapp';
import Button from '../common/Button';
import SocialIcon from '../common/SocialIcon';

const emptyForm = { name: '', phone: '', address: '', notes: '' };

const inputStyles =
  'w-full rounded-2xl border bg-surface px-4 py-3 text-base text-ink transition-colors outline-none placeholder:text-ink-soft/50 focus:border-honey focus:ring-4 focus:ring-honey/15';

function validateForm(form) {
  const errors = {};
  const phoneDigits = form.phone.replace(/\D/g, '');

  if (form.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid phone number (at least 10 digits).';
  }
  if (form.address.trim().length < 10) errors.address = 'Please enter your full delivery address.';
  return errors;
}

function FormField({ id, label, error, optional = false, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b4441f]">
          {error}
        </p>
      )}
    </div>
  );
}

/*
  Collects the customer's details and opens WhatsApp with the full order message.
  The details are kept in memory only — they are never saved to the browser.
*/
function WhatsAppCheckout({ onBack }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { openWhatsApp } = useWhatsApp();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (cartItems.length === 0) return;

    const formErrors = validateForm(form);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      // Move focus to the first field with a problem.
      document.getElementById(`checkout-${Object.keys(formErrors)[0]}`)?.focus();
      return;
    }

    const message = generateCartOrderMessage(cartItems, cartTotal, form);
    setHasOpenedWhatsApp(openWhatsApp(message));
  }

  // Shown after WhatsApp opens. The order is NOT complete until the customer sends it.
  if (hasOpenedWhatsApp) {
    return (
      <div className="space-y-5 text-center">
        <CircleCheck className="mx-auto size-12 text-whatsapp" aria-hidden="true" />
        <div>
          <h3 className="text-2xl">Almost there!</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Your order message is ready in WhatsApp. Please review it and press{' '}
            <strong>send</strong>. Your order is confirmed once our team replies.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => setHasOpenedWhatsApp(false)} fullWidth>
            Edit details or reopen WhatsApp
          </Button>
          <Button variant="primary" onClick={clearCart} fullWidth>
            I&apos;ve sent my order — clear cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to cart
        </button>
      )}

      <div>
        <h3 className="text-2xl">Delivery details</h3>
        <p className="mt-1 text-sm text-ink-soft">
          These details are added to your WhatsApp message. Nothing is stored on this website.
        </p>
      </div>

      <FormField id="checkout-name" label="Full name" error={errors.name}>
        <input
          id="checkout-name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'checkout-name-error' : undefined}
          className={`${inputStyles} ${errors.name ? 'border-[#b4441f]' : 'border-ink/15'}`}
        />
      </FormField>

      <FormField id="checkout-phone" label="Phone number" error={errors.phone}>
        <input
          id="checkout-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          value={form.phone}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
          className={`${inputStyles} ${errors.phone ? 'border-[#b4441f]' : 'border-ink/15'}`}
        />
      </FormField>

      <FormField id="checkout-address" label="Delivery address" error={errors.address}>
        <textarea
          id="checkout-address"
          name="address"
          rows={3}
          autoComplete="street-address"
          placeholder="House, street, area, city, PIN code"
          value={form.address}
          onChange={handleChange}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? 'checkout-address-error' : undefined}
          className={`${inputStyles} resize-none ${errors.address ? 'border-[#b4441f]' : 'border-ink/15'}`}
        />
      </FormField>

      <FormField id="checkout-notes" label="Notes" optional>
        <textarea
          id="checkout-notes"
          name="notes"
          rows={2}
          value={form.notes}
          onChange={handleChange}
          className={`${inputStyles} resize-none border-ink/15`}
        />
      </FormField>

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        fullWidth
        disabled={cartItems.length === 0}
      >
        <SocialIcon name="whatsapp" className="size-5" />
        Place Order on WhatsApp
      </Button>
    </form>
  );
}

export default WhatsAppCheckout;
