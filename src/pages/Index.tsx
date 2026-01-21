import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import useEmblaCarousel from 'embla-carousel-react';

const Index = () => {
  const { toast } = useToast();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const carouselImages = [
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/1.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/2.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/3.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/4.png',
    'https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/bucket/5.png',
  ];

  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: '',
    paymentMethod: 'card',
    quantity: 1
  });

  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const handleAddressChange = async (value: string) => {
    setOrderForm({ ...orderForm, address: value });
    
    if (value.length < 3) {
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(false);
  };

  const selectAddress = (suggestion: any) => {
    setOrderForm({ ...orderForm, address: suggestion.value });
    setShowSuggestions(false);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://functions.poehali.dev/cdeed1f5-93df-4541-994e-cf7929bbca4b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderForm)
      });

      const data = await response.json();

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте позже.",
        variant: "destructive"
      });
    }
  };

  const totalPrice = 1230 * orderForm.quantity;

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-border py-4 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-[#339edc]">PharmExpert</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden md:block">Экспертный подход к вашему здоровью</p>
        </div>
      </header>

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

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#339edc] to-[#2889c4] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 text-lg px-6 py-2">
                  Покупайте напрямую у производителя
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Почему выгоднее покупать у нас, а не на маркетплейсах?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="TrendingDown" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Цена ниже на 40%</h3>
                  <p className="text-white/90 text-center">
                    Без наценки маркетплейсов. У нас 1 230 ₽, на WB/Ozon — 1 999 ₽
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Shield" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">100% оригинал</h3>
                  <p className="text-white/90 text-center">
                    Гарантия подлинности от производителя. Никаких подделок и пересортицы
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Calendar" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Свежая партия</h3>
                  <p className="text-white/90 text-center">Прямые поставки. Свежий срок годности!</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Headphones" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">Прямая поддержка</h3>
                  <p className="text-white/90 text-center">
                    Консультация от производителя. Ответим на вопросы о применении и совместимости
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-white text-[#339edc] hover:bg-white/90 text-xl px-12 py-6 font-bold shadow-xl"
                  onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Заказать со скидкой 40%
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Преимущества продукта</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Zap', title: 'Снижает усталость', desc: 'Клинически доказано снижение усталости на 82% за 30 дней приёма' },
              { icon: 'Heart', title: 'Поддержка сердца', desc: 'Нормализует сердечный ритм и артериальное давление' },
              { icon: 'Brain', title: 'Улучшает концентрацию', desc: 'Повышает когнитивные функции и память на 67%' },
              { icon: 'Moon', title: 'Качество сна', desc: 'Улучшает качество сна и засыпание в 2.3 раза' },
              { icon: 'Activity', title: 'Энергия мышц', desc: 'Предотвращает судороги, повышает выносливость' },
              { icon: 'Smile', title: 'Стрессоустойчивость', desc: 'Снижает уровень кортизола и тревожности' }
            ].map((benefit, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-[#D4EAF2]">
                <CardContent className="pt-6">
                  <div className="bg-[#E8F4F8] w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Icon name={benefit.icon} className="text-[#339edc]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#E8F4F8]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Характеристики</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Форма магния:</span>
                  <span className="text-[#339edc] font-bold">Хелат (бисглицинат)</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Биодоступность:</span>
                  <span className="text-[#339edc] font-bold">95%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Магний на капсулу:</span>
                  <span className="text-[#339edc] font-bold">400 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Витамин В6:</span>
                  <span className="text-[#339edc] font-bold">10 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Капсул в упаковке:</span>
                  <span className="text-[#339edc] font-bold">120 шт</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Курс приема:</span>
                  <span className="text-[#339edc] font-bold">30 дней</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Состав</h2>
          <p className="text-center text-muted-foreground mb-12">
            Только натуральные компоненты высочайшего качества
          </p>
          <div className="space-y-4">
            <div className="bg-[#E8F4F8] p-6 rounded-lg border-2 border-[#D4EAF2]">
              <h4 className="font-bold mb-2 text-lg">🌿 Магний бисглицинат (хелат) — 400 мг</h4>
              <p className="text-muted-foreground">Наиболее биодоступная форма магния с органическими молекулами аминокислот</p>
            </div>
            <div className="bg-[#E8F4F8] p-6 rounded-lg border-2 border-[#D4EAF2]">
              <h4 className="font-bold mb-2 text-lg">💊 Пиридоксин (Витамин В6) — 10 мг</h4>
              <p className="text-muted-foreground">Усиливает усвоение магния и участвует в энергетическом обмене</p>
            </div>
            <div className="bg-[#E8F4F8] p-6 rounded-lg border-2 border-[#D4EAF2]">
              <h4 className="font-bold mb-2 text-lg">🌾 Растительная капсула (целлюлоза)</h4>
              <p className="text-muted-foreground">Гипоаллергенная оболочка из целлюлозы, подходит для вегетарианцев</p>
            </div>
            <div className="bg-gradient-to-r from-[#339edc]/20 to-[#5BC0DE]/20 p-4 rounded-lg border-2 border-[#339edc]">
              <p className="text-sm font-semibold text-center">
                ✓ Без ГМО • Без глютена • Без сои • Без лактозы
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-[#E8F4F8] to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Применение и рекомендации</h2>
          <div className="bg-card p-8 rounded-xl shadow-lg border-2 border-[#D4EAF2]">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#339edc] mb-4">1-2</div>
                <h3 className="text-xl font-bold mb-2">Дозировка</h3>
                <p className="text-muted-foreground">По 1-2 капсулы в день</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#339edc] mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2">Время приема</h3>
                <p className="text-muted-foreground">Утром и вечером во время еды</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#339edc] mb-4">30</div>
                <h3 className="text-xl font-bold mb-2">Курс</h3>
                <p className="text-muted-foreground">Минимум 30 дней для видимых результатов</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-center">💡 Важные рекомендации</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-[#339edc] mt-1 flex-shrink-0" size={20} />
                <span>Запивайте достаточным количеством воды (200-250 мл)</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-[#339edc] mt-1 flex-shrink-0" size={20} />
                <span>Не принимайте одновременно с кальцием — снижает усвоение (разнесите приёмы на 2-3 часа)</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-[#339edc] mt-1 flex-shrink-0" size={20} />
                <span>Лучше усваивается при приёме с белковой пищей</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-[#339edc] mt-1 flex-shrink-0" size={20} />
                <span>Первые результаты заметны через 7-14 дней регулярного приёма</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-[#339edc] mt-1 flex-shrink-0" size={20} />
                <span>Хелатная форма не вызывает расстройств ЖКТ в отличие от оксида магния</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Отзывы</h2>
          <p className="text-center text-muted-foreground mb-12">Реальные результаты наших клиентов</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Елена, 34 года', rating: 5, text: 'Через 2 недели приёма исчезли судороги в ногах, которые мучили меня годами! Сон стал глубже, засыпаю за 10 минут вместо часа.' },
              { name: 'Дмитрий, 42 года', rating: 5, text: 'Работаю в IT, постоянный стресс. После курса магния концентрация улучшилась, перестал пить 5 чашек кофе в день. Рекомендую!' },
              { name: 'Ольга, 28 лет', rating: 5, text: 'Принимаю второй месяц. Ушла хроническая усталость, настроение стабильное, энергии хватает на работу и спортзал. Буду заказывать ещё!' }
            ].map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-[#D4EAF2]">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-[#339edc]">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#E8F4F8]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Вопросы и ответы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="bg-card px-6 rounded-lg border-[#D4EAF2]">
              <AccordionTrigger className="text-lg font-semibold">
                Чем хелат магния лучше других форм?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Хелатная форма имеет биодоступность до 95% против 30-40% у оксида магния. Магний связан с аминокислотами, что обеспечивает максимальное усвоение без побочных эффектов со стороны ЖКТ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="bg-card px-6 rounded-lg border-[#D4EAF2]">
              <AccordionTrigger className="text-lg font-semibold">
                Есть ли побочные эффекты?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Хелат магния — самая безопасная форма. В отличие от оксида или цитрата, не вызывает расстройств ЖКТ. Возможна индивидуальная непереносимость компонентов (крайне редко).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="bg-card px-6 rounded-lg border-[#D4EAF2]">
              <AccordionTrigger className="text-lg font-semibold">
                Когда будет результат?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Первые эффекты (улучшение сна, снижение тревожности) — через 7-10 дней. Полный эффект по энергии, концентрации, устранению судорог — через 3-4 недели регулярного приёма.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="bg-card px-6 rounded-lg border-[#D4EAF2]">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли принимать беременным?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Магний безопасен при беременности и лактации, но дозировку должен определить врач. Проконсультируйтесь с вашим акушером-гинекологом перед началом приёма.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5" className="bg-card px-6 rounded-lg border-[#D4EAF2]">
              <AccordionTrigger className="text-lg font-semibold">
                Совместим ли с другими добавками?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, хорошо сочетается с витамином D, омега-3, цинком. Не рекомендуется одновременный приём с высокими дозами кальция (снижает усвоение магния) — разнесите приёмы на 2-3 часа.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="order-form" className="py-20 px-4 bg-gradient-to-br from-white to-[#E8F4F8]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-2xl border-2 border-[#339edc]">
            <h2 className="text-3xl font-bold text-center mb-2">Оформить заказ</h2>
            <p className="text-center text-muted-foreground mb-8">
              Заполните форму, и мы свяжемся с вами для подтверждения
            </p>
            
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">ФИО *</Label>
                <Input
                  id="fullName"
                  placeholder="Иванов Иван Иванович"
                  value={orderForm.fullName}
                  onChange={(e) => setOrderForm({ ...orderForm, fullName: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (900) 123-45-67"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  placeholder="Город, улица, дом, квартира"
                  value={orderForm.address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  required
                  className="mt-2"
                />
                {showSuggestions && addressSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {addressSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-[#E8F4F8] transition-colors border-b last:border-b-0"
                        onClick={() => selectAddress(suggestion)}
                      >
                        <p className="font-medium">{suggestion.value}</p>
                        {suggestion.data.postal_code && (
                          <p className="text-sm text-muted-foreground">Индекс: {suggestion.data.postal_code}</p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="deliveryMethod">Служба доставки *</Label>
                <Select 
                  value={orderForm.deliveryMethod} 
                  onValueChange={(value) => setOrderForm({ ...orderForm, deliveryMethod: value })}
                  required
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите службу доставки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdek">СДЭК</SelectItem>
                    <SelectItem value="yandex">Яндекс Доставка</SelectItem>
                    <SelectItem value="ozon">Ozon Доставка</SelectItem>
                    <SelectItem value="wb">WB Доставка</SelectItem>
                    <SelectItem value="russianpost">Почта РФ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Способ оплаты *</Label>
                <RadioGroup 
                  value={orderForm.paymentMethod} 
                  onValueChange={(value) => setOrderForm({ ...orderForm, paymentMethod: value })}
                  className="mt-2 space-y-3"
                >
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:bg-[#E8F4F8] transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2">
                        <Icon name="CreditCard" size={20} className="text-[#339edc]" />
                        <span className="font-semibold">Банковская карта</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Visa, MasterCard, МИР</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:bg-[#E8F4F8] transition-colors cursor-pointer">
                    <RadioGroupItem value="sbp" id="sbp" />
                    <Label htmlFor="sbp" className="cursor-pointer flex-1">
                      <div className="flex items-center gap-2">
                        <Icon name="Smartphone" size={20} className="text-[#339edc]" />
                        <span className="font-semibold">СБП (Система Быстрых Платежей)</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Оплата через мобильный банк</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-[#E8F4F8] p-6 rounded-lg border-2 border-[#D4EAF2]">
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="quantity">Количество:</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                    className="w-20"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-semibold">Итого к оплате:</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-[#339edc]">{totalPrice.toLocaleString()} ₽</span>
                    {orderForm.quantity > 1 && (
                      <p className="text-sm text-muted-foreground">
                        {orderForm.quantity} шт × 1 230 ₽
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#339edc] hover:bg-[#2889c4] text-white text-xl py-8"
              >
                Перейти к оплате
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-[#339edc] to-[#2889c4] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Почему выбирают PharmExpert?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Высокое качество</h3>
              <p className="opacity-90">Сертификаты GMP и ISO, строгий контроль производства</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="opacity-90">Бесплатная доставка по всей России за 2-7 дней</p>
            </div>
            <div>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Лучшие цены</h3>
              <p className="opacity-90">Работаем напрямую с производителем без наценок</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#3A3529] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <h3 className="text-2xl font-bold">PharmExpert</h3>
              </div>
              <p className="text-white/70">Экспертный подход к вашему здоровью</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <p className="text-white/70 mb-2">Email: info@pharmexpert.ru</p>
              <p className="text-white/70">Телефон: 8 (928) 773-05-53</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <p className="text-white/70 mb-2">Доставка и оплата</p>
              <p className="text-white/70">Политика конфиденциальности</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p className="mb-2">© 2024 PharmExpert. Все права защищены.</p>
            <p>БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;