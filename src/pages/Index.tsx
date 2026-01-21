import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import ProductInfo from '@/components/landing/ProductInfo';
import OrderForm from '@/components/landing/OrderForm';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductInfo />
      <OrderForm />
      <Footer />
    </div>
  );
};

export default Index;
