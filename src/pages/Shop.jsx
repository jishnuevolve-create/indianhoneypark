import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/common/Container';
import PageHeader from '../components/layout/PageHeader';
import ProductGrid from '../components/products/ProductGrid';
import { usePageMeta } from '../hooks/usePageMeta';
import { searchProducts } from '../utils/productUtils';

// All products, with a search box. The search text is kept in the URL (?q=…) so it can be shared.
function Shop() {
  usePageMeta('Shop Honey', 'Browse all Indian Honey varieties and order on WhatsApp.');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('q') || '';
  const visibleProducts = searchProducts(searchText);

  function handleSearchChange(event) {
    const value = event.target.value;
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="The Honey Collection"
        description="Pick your favourite variety, choose a bottle and add it to your cart."
      />

      <Container className="pb-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft" aria-live="polite">
            Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'honey' : 'honeys'}
          </p>
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <label htmlFor="shop-search" className="sr-only">
              Search honey
            </label>
            <input
              id="shop-search"
              type="search"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search honey…"
              className="h-12 w-full rounded-full border border-ink/15 bg-surface pr-11 pl-11 text-base outline-none placeholder:text-ink-soft/60 focus:border-honey focus:ring-4 focus:ring-honey/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchParams({}, { replace: true })}
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-cream"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <ProductGrid
          products={visibleProducts}
          emptyMessage={`No honey matches “${searchText}”. Try a different name.`}
        />
      </Container>
    </>
  );
}

export default Shop;
