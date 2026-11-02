import { useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import PageHeader from '../components/layout/PageHeader';
import { policies } from '../data/pageContent';
import { usePageMeta } from '../hooks/usePageMeta';
import NotFound from './NotFound';

// Shipping, privacy and terms pages: /policies/shipping, /policies/privacy, /policies/terms
function Policy() {
  const { policySlug } = useParams();
  const policy = Object.hasOwn(policies, policySlug) ? policies[policySlug] : null;
  usePageMeta(policy?.title || 'Page not found');

  if (!policy) return <NotFound />;

  return (
    <>
      <PageHeader eyebrow="Policies" title={policy.title} />
      <Container className="pb-24">
        <div className="mx-auto max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
          {policy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Policy;
