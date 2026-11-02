import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getResponsiveImageProps, getStartingPrice } from '../../utils/productUtils';
import SafeImage from '../common/SafeImage';
import Price from './Price';

// Simple browsing card: the whole card links to the product page.
// Phones show two per row, so spacing and text are smaller there.
function CategoryCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-ink/5 transition duration-500 hover:-translate-y-1 hover:shadow-lift sm:rounded-[1.75rem]"
    >
      <div
        className="relative flex aspect-[4/4.2] items-end justify-center overflow-hidden"
        style={{ backgroundColor: product.tint }}
      >
        <div className="absolute inset-x-4 top-4 bottom-0 rounded-t-full bg-warm-white/45 sm:inset-x-8 sm:top-8" />
        <SafeImage
          {...getResponsiveImageProps(product.images?.[0], '(min-width: 1024px) 25vw, 50vw')}
          alt={`${product.name} bottle`}
          className="relative h-[88%] w-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-base sm:text-xl">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft sm:mt-1.5 sm:text-sm">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex flex-col items-start gap-1.5 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
          <Price amount={getStartingPrice(product)} prefix="From " className="text-xs sm:text-sm" />
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition-colors group-hover:text-amber-dark sm:text-sm">
            View Product
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
