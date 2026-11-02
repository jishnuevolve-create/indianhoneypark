import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../../utils/productUtils';
import Button from '../common/Button';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import ProductGrid from '../products/ProductGrid';

// Products with featured: true in products.js appear here.
function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();
  if (featuredProducts.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="bg-cream py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="featured-heading"
            eyebrow="Handpicked for you"
            title="Naturally Sweet. Beautifully Pure."
            description="Choose your bottle, set the quantity and add to cart — or order instantly on WhatsApp."
          />
        </Reveal>
        <div className="mt-12 lg:mt-16">
          <ProductGrid products={featuredProducts} />
        </div>
        <div className="mt-12 text-center">
          <Button to="/shop" variant="outline">
            View all honey
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
