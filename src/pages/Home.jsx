import BrandStory from '../components/home/BrandStory';
import FAQ from '../components/home/FAQ';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Hero from '../components/home/Hero';
import HoneyMarquee from '../components/home/HoneyMarquee';
import HowToOrder from '../components/home/HowToOrder';
import Testimonials from '../components/home/Testimonials';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { usePageMeta } from '../hooks/usePageMeta';

// The homepage is just a list of sections. Reorder or remove lines here to change the page.
function Home() {
  usePageMeta();

  return (
    <>
      <Hero />
      <HoneyMarquee />
      <WhyChooseUs />
      <FeaturedProducts />
      <BrandStory />
      <HowToOrder />
      <Testimonials />
      <FAQ />
    </>
  );
}

export default Home;
