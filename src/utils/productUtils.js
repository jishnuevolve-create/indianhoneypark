import { products } from '../data/products';
import { hasPrice } from './currency';

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) || null;
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId) || null;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getVariants(product) {
  return Array.isArray(product?.variants) ? product.variants : [];
}

export function getVariantById(product, variantId) {
  return getVariants(product).find((variant) => variant.id === variantId) || null;
}

// Lowest price among the variants that have one, or null if none are priced yet.
export function getStartingPrice(product) {
  const prices = getVariants(product)
    .map((variant) => variant.price)
    .filter(hasPrice);
  return prices.length > 0 ? Math.min(...prices) : null;
}

// Uses the variant's own image when it has one, otherwise the product's main image.
export function getProductImage(product, variant) {
  return variant?.image || product?.images?.[0] || '';
}

/*
  Every product photo (e.g. kashmir-honey-bottle.webp, 1200px) has a smaller
  copy next to it ending in -600.webp. These props let the browser pick the
  right size, so phones and small cards don't download the large photo.
  `sizes` describes how wide the image is shown on screen.
  If the small copy is missing, SafeImage falls back to the full photo (fallbackSrc).
*/
export function getResponsiveImageProps(imagePath, sizes) {
  if (!/\.webp$/.test(imagePath || '') || !imagePath.startsWith('/images/products/')) {
    return { src: imagePath };
  }
  const smallImagePath = imagePath.replace(/\.webp$/, '-600.webp');
  return {
    src: smallImagePath,
    srcSet: `${smallImagePath} 600w, ${imagePath} 1200w`,
    sizes,
    fallbackSrc: imagePath,
  };
}

// The smaller copy only, for thumbnails (cart, search, gallery thumbnails).
export function getThumbnailImageProps(imagePath) {
  const { src, fallbackSrc } = getResponsiveImageProps(imagePath);
  return { src, fallbackSrc };
}

// e.g. "Medium · 500 g" (size is left out until it is filled in).
export function getVariantDisplayName(variant) {
  if (!variant) return '';
  return variant.size ? `${variant.label} · ${variant.size}` : variant.label;
}

export function getRelatedProducts(product, limit = 4) {
  return products.filter((item) => item.id !== product?.id).slice(0, limit);
}

export function searchProducts(searchText) {
  const query = searchText.trim().toLowerCase();
  if (!query) return products;
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query),
  );
}
