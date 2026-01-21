import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import ProductInfo from '@/components/landing/ProductInfo';
import OrderForm from '@/components/landing/OrderForm';
import Footer from '@/components/landing/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        productData={{
          name: "Магний Хелат + Витамин В6",
          description: "Премиальная форма магния с максимальной биодоступностью 95%. Снижает усталость, улучшает сон и концентрацию. Поддерживает нервную систему и мышечную функцию.",
          image: "https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/1.png",
          brand: "PharmExpert",
          offers: {
            price: "1230",
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2026-12-31"
          },
          aggregateRating: {
            ratingValue: "4.8",
            reviewCount: "327"
          }
        }}
        organizationData={{
          name: "PharmExpert",
          url: "https://preview--magnesium-b6-page.poehali.dev",
          logo: "https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/1.png"
        }}
      />
      <Header />
      <HeroSection />
      <ProductInfo />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;