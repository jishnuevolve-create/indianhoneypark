import { ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Container from '../components/common/Container';
import { usePageMeta } from '../hooks/usePageMeta';

function NotFound({ message = "The page you're looking for doesn't exist or has moved." }) {
  usePageMeta('Page not found');

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl text-honey italic">404</p>
      <h1 className="mt-4">This jar is empty.</h1>
      <p className="mt-3 max-w-md text-ink-soft">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/shop">
          Explore Collection
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
        <Button to="/" variant="outline">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}

export default NotFound;
