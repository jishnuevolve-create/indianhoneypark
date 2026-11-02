import Container from '../common/Container';

// Title band used at the top of inner pages (Shop, Cart, About, Contact, policies).
function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="bg-gradient-to-b from-cream to-warm-white">
      <Container className="py-14 text-center sm:py-20">
        {eyebrow && (
          <p className="mb-2 animate-fade-up font-script text-2xl text-amber sm:text-3xl">
            {eyebrow}
          </p>
        )}
        <h1 className="mx-auto max-w-3xl animate-fade-up [animation-delay:80ms]">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-soft [animation-delay:160ms]">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}

export default PageHeader;
