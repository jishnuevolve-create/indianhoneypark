import { useState } from 'react';
import { sanitizeQuantity } from '../utils/cartUtils';
import { getVariantById, getVariantDisplayName, getVariants } from '../utils/productUtils';
import { generateProductEnquiryMessage } from '../utils/whatsapp';
import { useCart } from './useCart';
import { useToast } from './useToast';
import { useWhatsApp } from './useWhatsApp';

/*
  Shared "choose a bottle + quantity, then buy" logic.
  Used by product cards and the product details page so the behaviour is identical.
*/
export function useProductSelection(product) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { openWhatsApp } = useWhatsApp();

  const variants = getVariants(product);
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = getVariantById(product, selectedVariantId) || variants[0] || null;

  function changeQuantity(newQuantity) {
    setQuantity(sanitizeQuantity(newQuantity));
  }

  function handleAddToCart() {
    if (!product || !selectedVariant) {
      showToast('Please choose a bottle option before adding to cart.', 'error');
      return;
    }
    addToCart(product.id, selectedVariant.id, quantity);
    showToast(
      `${product.name} (${getVariantDisplayName(selectedVariant)}) × ${quantity} added to cart.`,
    );
  }

  function handleWhatsAppOrder() {
    if (!product || !selectedVariant) {
      showToast('Please choose a bottle option first.', 'error');
      return;
    }
    openWhatsApp(generateProductEnquiryMessage(product, selectedVariant, quantity));
  }

  return {
    variants,
    selectedVariant,
    selectVariant: setSelectedVariantId,
    quantity,
    changeQuantity,
    handleAddToCart,
    handleWhatsAppOrder,
  };
}
