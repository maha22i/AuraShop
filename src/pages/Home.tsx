import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <FeaturedProducts />
      <ProductGrid />
      
    </main>
  );
}