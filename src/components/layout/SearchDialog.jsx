import { ArrowRight, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/currency';
import { getStartingPrice, getThumbnailImageProps, searchProducts } from '../../utils/productUtils';
import Container from '../common/Container';
import Drawer from '../common/Drawer';
import SafeImage from '../common/SafeImage';

// Quick product search that drops down from the top of the screen.
function SearchDialog({ isOpen, onClose }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const results = searchProducts(searchText);

  function handleSubmit(event) {
    event.preventDefault();
    onClose();
    navigate(searchText.trim() ? `/shop?q=${encodeURIComponent(searchText.trim())}` : '/shop');
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="top" label="Search products">
      <Container className="py-5 sm:py-8">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-ink/15 pb-3"
        >
          <Search className="size-5 shrink-0 text-ink-soft" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search honey
          </label>
          <input
            id="site-search"
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search for a honey…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 font-display text-xl outline-none placeholder:text-ink-soft/50 focus-visible:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-cream"
            aria-label="Close search"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </form>

        <div className="max-h-[55vh] overflow-y-auto pt-4">
          {results.length === 0 ? (
            <p className="py-6 text-center text-ink-soft">
              No honey matches “{searchText}”. Try another name.
            </p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-cream"
                  >
                    <span
                      className="flex size-16 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: product.tint }}
                    >
                      <SafeImage
                        {...getThumbnailImageProps(product.images?.[0])}
                        alt=""
                        className="size-14 object-contain"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg">{product.name}</span>
                      <span className="block text-sm text-ink-soft">
                        {formatPrice(getStartingPrice(product))}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 text-ink-soft/40 transition-transform group-hover:translate-x-1 group-hover:text-amber"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Drawer>
  );
}

export default SearchDialog;
