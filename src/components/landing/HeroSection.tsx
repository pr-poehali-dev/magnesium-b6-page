import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import useEmblaCarousel from 'embla-carousel-react';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endTime = Date.now() + 24 * 60 * 60 * 1000;
    
    const updateTimer = () => {
      const now = Date.now();
      const difference = endTime - now;
      
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <section className="relative bg-gradient-to-br from-[#E8F4F8] via-white to-[#D4EAF2] py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <a 
          href="https://t.me/badpoehalibot" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#339edc] hover:bg-[#2889c4] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <Icon name="MessageCircle" size={18} className="md:w-5 md:h-5" />
          Написать в Telegram
        </a>
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="animate-fade-in">
          <Badge className="mb-4 bg-[#339edc] text-white hover:bg-[#2889c4]">
            Клинически доказанная эффективность
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground leading-tight">
            Магний Хелат<br/>+ Витамин В6
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-6">
            Премиальная форма магния с максимальной биодоступностью 95%
          </p>

          <Card className="border-[#f4e925]/30 bg-gradient-to-br from-white to-[#fffef0] shadow-lg mb-4 md:mb-6">
            <CardContent className="pt-3 pb-3 md:pt-4 md:pb-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/be92222f-c9d8-4619-b5da-59935c75bb7d.png" 
                    alt="Честный ЗНАК" 
                    className="h-12 md:h-16 w-auto"
                  />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold mb-1 text-gray-800">
                    Маркировка «Честный ЗНАК»
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-600 leading-snug">
                    Каждая упаковка имеет уникальный код для проверки подлинности. Проверьте на{' '}
                    <a 
                      href="https://честныйзнак.рф" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#339edc] hover:underline font-semibold"
                    >
                      честныйзнак.рф
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 md:p-6 rounded-2xl mb-4 md:mb-6 shadow-lg">
            <div className="flex items-baseline gap-2 md:gap-3 mb-2 flex-wrap">
              <span className="text-xs md:text-sm font-semibold bg-white text-red-600 px-2 md:px-3 py-1 rounded-full">АКЦИЯ</span>
              <span className="text-3xl md:text-4xl font-bold">1 230 ₽</span>
              <span className="text-lg md:text-xl line-through opacity-75">1 999 ₽</span>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 mt-3 mb-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon name="Clock" size={18} />
                <span className="text-xs md:text-sm font-semibold">До конца акции осталось:</span>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="bg-white/30 rounded-lg p-2 text-center">
                  <div className="text-2xl md:text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-[10px] md:text-xs opacity-90">часов</div>
                </div>
                <div className="bg-white/30 rounded-lg p-2 text-center">
                  <div className="text-2xl md:text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-[10px] md:text-xs opacity-90">минут</div>
                </div>
                <div className="bg-white/30 rounded-lg p-2 text-center">
                  <div className="text-2xl md:text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-[10px] md:text-xs opacity-90">секунд</div>
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base lg:text-lg font-semibold flex items-center gap-2">
              <Icon name="Truck" size={24} />
              Бесплатная доставка по всей РФ!
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" className="text-[#339edc]" size={20} />
              <span className="text-sm md:text-base font-semibold">Усвоение 95%</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-[#339edc]" size={20} />
              <span className="text-sm md:text-base font-semibold">GMP сертификат</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Leaf" className="text-[#339edc]" size={20} />
              <span className="text-sm md:text-base font-semibold">100% натуральный</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-[#339edc] hover:bg-[#2889c4] text-white text-base md:text-lg lg:text-xl py-6 md:py-8"
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
                    loading={index === 0 ? "eager" : "lazy"}
                    width="800"
                    height="600"
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