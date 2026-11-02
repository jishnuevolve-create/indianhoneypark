import Reveal from '../common/Reveal';
import ProductCard from './ProductCard';

// Responsive grid of shoppable product cards: 2 per row on phones, up to 4 on wide screens.
// Cards fade in one after another as they scroll into view.
function ProductGrid({ products, emptyMessage = 'No products found.' }) {
  if (!products || products.length === 0) {
    return <p className="py-16 text-center text-ink-soft">{emptyMessage}</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={(index % 4) * 90}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </ul>
  );
}

export default ProductGrid;
