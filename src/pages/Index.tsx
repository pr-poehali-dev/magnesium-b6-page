import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    quantity: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заказ принят!",
      description: "Наш менеджер свяжется с вами в ближайшее время.",
    });
    setFormData({ name: '', phone: '', quantity: 1 });
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground">Клинически доказанная эффективность</Badge>
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Магний хелат<br/>с витамином В6
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Премиальная форма магния с максимальной биодоступностью 95%
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-primary" size={24} />
                <span className="font-semibold">Усвоение 95%</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" className="text-primary" size={24} />
                <span className="font-semibold">GMP сертификат</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Leaf" className="text-primary" size={24} />
                <span className="font-semibold">100% натуральный</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Оформить заказ</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Количество:</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="w-24"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                  Заказать сейчас
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                ⭐ Доставка по России 2-5 дней
              </p>
            </div>
          </div>
          <div className="animate-fade-in">
            <img 
              src="https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/files/9a5c9535-30bd-4bba-8fa2-c2768ca440cb.jpg" 
              alt="Магний хелат с витамином В6"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Преимущества</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Zap', title: 'Снижает усталость', desc: 'Клинически доказано снижение усталости на 82% за 30 дней' },
              { icon: 'Heart', title: 'Поддержка сердца', desc: 'Нормализует сердечный ритм и артериальное давление' },
              { icon: 'Brain', title: 'Улучшает концентрацию', desc: 'Повышает когнитивные функции и память на 67%' },
              { icon: 'Moon', title: 'Качество сна', desc: 'Улучшает качество сна и засыпание в 2.3 раза' },
              { icon: 'Activity', title: 'Энергия мышц', desc: 'Предотвращает судороги, повышает выносливость' },
              { icon: 'Smile', title: 'Стрессоустойчивость', desc: 'Снижает уровень кортизола и тревожности' }
            ].map((benefit, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Icon name={benefit.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Характеристики</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Форма магния:</span>
                  <span className="text-primary font-bold">Хелат</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Биодоступность:</span>
                  <span className="text-primary font-bold">95%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Магний на капсулу:</span>
                  <span className="text-primary font-bold">400 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Витамин В6:</span>
                  <span className="text-primary font-bold">10 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Капсул в упаковке:</span>
                  <span className="text-primary font-bold">90 шт</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Курс приема:</span>
                  <span className="text-primary font-bold">30 дней</span>
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/files/bc2a0dd4-77bf-4aa3-a1b9-1e0bb75f5b82.jpg" 
              alt="Капсулы магния"
              className="rounded-2xl shadow-lg"
            />
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-lg">🌿 Магний бисглицинат (хелат)</h4>
                <p className="text-muted-foreground">Наиболее биодоступная форма магния с органическими молекулами аминокислот</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-lg">💊 Пиридоксин (Витамин В6)</h4>
                <p className="text-muted-foreground">Усиливает усвоение магния и участвует в энергетическом обмене</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-lg">🌾 Растительная капсула</h4>
                <p className="text-muted-foreground">Гипоаллергенная оболочка из целлюлозы, подходит для вегетарианцев</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary">
                <p className="text-sm font-semibold text-center">
                  ✓ Без ГМО • Без глютена • Без сои • Без лактозы
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Применение</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-primary mb-4">1</div>
                <h3 className="text-xl font-bold mb-3">Дозировка</h3>
                <p className="text-muted-foreground">По 1-2 капсулы в день во время еды</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-primary mb-4">2</div>
                <h3 className="text-xl font-bold mb-3">Время приема</h3>
                <p className="text-muted-foreground">Утром и вечером для лучшего усвоения</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="text-5xl font-bold text-primary mb-4">30</div>
                <h3 className="text-xl font-bold mb-3">Курс</h3>
                <p className="text-muted-foreground">Минимум 30 дней для видимых результатов</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 bg-card p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">💡 Рекомендации</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>Запивайте достаточным количеством воды (200-250 мл)</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>Не принимайте одновременно с кальцием — снижает усвоение</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>Лучше усваивается при приеме с белковой пищей</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                <span>Первые результаты заметны через 7-14 дней регулярного приема</span>
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
              { name: 'Елена, 34 года', rating: 5, text: 'Через 2 недели приема исчезли судороги в ногах, которые мучили меня годами! Сон стал глубже, засыпаю за 10 минут вместо часа.' },
              { name: 'Дмитрий, 42 года', rating: 5, text: 'Работаю в IT, постоянный стресс. После курса магния концентрация улучшилась, перестал пить 5 чашек кофе в день. Рекомендую!' },
              { name: 'Ольга, 28 лет', rating: 5, text: 'Принимаю второй месяц. Ушла хроническая усталость, настроение стабильное, энергии хватает на работу и спортзал. Буду заказывать еще!' }
            ].map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-500 fill-yellow-500" size={18} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-primary">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Вопросы и ответы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="bg-card px-6 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold">
                Чем хелат магния лучше других форм?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Хелатная форма имеет биодоступность до 95% против 30-40% у оксида магния. Магний связан с аминокислотами, что обеспечивает максимальное усвоение без побочных эффектов со стороны ЖКТ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="bg-card px-6 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold">
                Есть ли побочные эффекты?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Хелат магния — самая безопасная форма. В отличие от оксида или цитрата, не вызывает расстройств ЖКТ. Возможна индивидуальная непереносимость компонентов (крайне редко).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="bg-card px-6 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold">
                Когда будет результат?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Первые эффекты (улучшение сна, снижение тревожности) — через 7-10 дней. Полный эффект по энергии, концентрации, устранению судорог — через 3-4 недели регулярного приема.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="bg-card px-6 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли принимать беременным?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Магний безопасен при беременности и лактации, но дозировку должен определить врач. Проконсультируйтесь с вашим акушером-гинекологом перед началом приема.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5" className="bg-card px-6 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold">
                Совместим ли с другими добавками?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, хорошо сочетается с витамином D, омега-3, цинком. Не рекомендуется одновременный прием с высокими дозами кальция (снижает усвоение магния) — разнесите приемы на 2-3 часа.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Сертификат качества</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Наш продукт соответствует международным стандартам GMP и прошел клинические испытания
          </p>
          <div className="bg-card p-8 rounded-2xl shadow-xl inline-block">
            <img 
              src="https://cdn.poehali.dev/projects/9a2d0943-7c49-4501-bb48-2ed61a00471a/files/6199478e-f15f-490c-b62f-17040baf16ce.jpg" 
              alt="Сертификат качества"
              className="rounded-lg max-w-md mx-auto"
            />
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-base py-2 px-4">
                <Icon name="Shield" className="mr-2" size={16} />
                GMP Certified
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Icon name="Award" className="mr-2" size={16} />
                ISO 9001
              </Badge>
              <Badge variant="outline" className="text-base py-2 px-4">
                <Icon name="CheckCircle" className="mr-2" size={16} />
                Клинически протестировано
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Закажите прямо сейчас</h2>
          <p className="text-xl mb-8 opacity-90">
            Специальная цена только сегодня: <span className="line-through">2990₽</span> <span className="text-5xl font-bold">1990₽</span>
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-xl py-8 px-12"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Оформить заказ со скидкой
          </Button>
          <p className="mt-6 text-sm opacity-75">
            🎁 При заказе 2 упаковок — доставка бесплатно
          </p>
        </div>
      </section>

      <footer className="bg-accent/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="mb-2">© 2024 Магний Хелат. Все права защищены.</p>
          <p className="text-sm">БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
