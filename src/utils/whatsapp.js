import { siteConfig } from '../data/siteConfig';
import { formatPrice, hasPrice } from './currency';
import { getVariantDisplayName } from './productUtils';

// WhatsApp needs the full international number as digits only, e.g. 919876543210.
export function getWhatsAppNumber() {
  return String(siteConfig.whatsappNumber || '').replace(/\D/g, '');
}

export function isWhatsAppConfigured() {
  const number = getWhatsAppNumber();
  return number.length >= 10 && number.length <= 15;
}

// Returns a wa.me link, or null if the business number has not been set up correctly.
export function buildWhatsAppUrl(message) {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function generateCartOrderMessage(cartItems, cartTotal, customer) {
  const itemLines = cartItems.map((item, index) =>
    [
      `${index + 1}. ${item.product.name}`,
      `   Variant: ${getVariantDisplayName(item.variant)}`,
      `   Quantity: ${item.quantity}`,
      hasPrice(item.unitPrice)
        ? `   Price: ${formatPrice(item.subtotal)} (${formatPrice(item.unitPrice)} each)`
        : `   Price: ${formatPrice(null)}`,
    ].join('\n'),
  );

  const totalLine = hasPrice(cartTotal)
    ? `Total: ${formatPrice(cartTotal)}`
    : 'Total: To be confirmed (some items are price on request)';

  const customerLines = [
    `Customer Name: ${customer.name.trim()}`,
    `Phone Number: ${customer.phone.trim()}`,
    `Delivery Address: ${customer.address.trim()}`,
  ];
  if (customer.notes?.trim()) {
    customerLines.push(`Notes: ${customer.notes.trim()}`);
  }

  return [
    `Hello ${siteConfig.brandName},`,
    '',
    'I would like to place an order.',
    '',
    'Order Details:',
    '',
    itemLines.join('\n\n'),
    '',
    totalLine,
    '',
    customerLines.join('\n'),
    '',
    'Please confirm availability, delivery charges, final amount, and payment details.',
    '',
    'Thank you.',
  ].join('\n');
}

export function generateProductEnquiryMessage(product, variant, quantity) {
  const unitPrice = hasPrice(variant?.price) ? formatPrice(variant.price) : 'Price on request';

  return [
    `Hello ${siteConfig.brandName},`,
    '',
    'I would like to order:',
    '',
    `Product: ${product.name}`,
    `Variant: ${getVariantDisplayName(variant)}`,
    `Quantity: ${quantity}`,
    `Price per bottle: ${unitPrice}`,
    '',
    'Please confirm availability, delivery charges, final amount, and payment details.',
    '',
    'Thank you.',
  ].join('\n');
}

export function generateGeneralEnquiryMessage(name, message) {
  const greeting = `Hello ${siteConfig.brandName},`;
  const signOff = name?.trim() ? `\n\n— ${name.trim()}` : '';
  return `${greeting}\n\n${message.trim()}${signOff}`;
}
