import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import useEmblaCarousel from 'embla-carousel-react';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const carouselImages = [
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/1.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/2.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/3.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/4.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/5.png',
  ];

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="relative bg-gradient-to-br from-[#E8F4F8] via-white to-[#D4EAF2] py-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <Badge className="mb-4 bg-[#339edc] text-white hover:bg-[#2889c4]">
            Клинически доказанная эффективность
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Магний Хелат<br/>+ Витамин В6
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Премиальная форма магния с максимальной биодоступностью 95%
          </p>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl mb-6 shadow-lg">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sm font-semibold bg-white text-red-600 px-3 py-1 rounded-full">АКЦИЯ</span>
              <span className="text-4xl font-bold">1 230 ₽</span>
              <span className="text-xl line-through opacity-75">1 999 ₽</span>
            </div>
            <p className="text-lg font-semibold flex items-center gap-2 mt-3">
              <Icon name="Truck" size={24} />
              Бесплатная доставка по всей РФ!
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" className="text-[#339edc]" size={24} />
              <span className="font-semibold">Усвоение 95%</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-[#339edc]" size={24} />
              <span className="font-semibold">GMP сертификат</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Leaf" className="text-[#339edc]" size={24} />
              <span className="font-semibold">100% натуральный</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-[#339edc] hover:bg-[#2889c4] text-white text-xl py-8"
            onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Заказать со скидкой
          </Button>
        </div>

        <div className="animate-fade-in">
          <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
            <div className="flex">
              {carouselImages.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <img 
                    src={src} 
                    alt={`Магний Хелат + Витамин В6 ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-[#339edc] w-8' : 'bg-gray-300'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
