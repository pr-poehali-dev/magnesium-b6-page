import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const ProductInfo = () => {
  return (
    <>
      <section className="py-8 md:py-12 lg:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#339edc] to-[#2889c4] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-6 md:mb-8">
                <Badge className="mb-3 md:mb-4 bg-white/20 text-white hover:bg-white/30 text-sm md:text-base lg:text-lg px-4 md:px-6 py-1.5 md:py-2">
                  Покупайте напрямую у производителя
                </Badge>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 leading-tight">
                  Почему выгоднее покупать у нас, а не на маркетплейсах?
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <Icon name="TrendingDown" className="text-white" size={24} />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 text-center">Цена ниже на 40%</h3>
                  <p className="text-sm md:text-base text-white/90 text-center">
                    Без наценки маркетплейсов. У нас 1 230 ₽, на WB/Ozon — 1 999 ₽
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <Icon name="Shield" className="text-white" size={24} />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 text-center">100% оригинал</h3>
                  <p className="text-sm md:text-base text-white/90 text-center">
                    Гарантия подлинности от производителя. Никаких подделок и пересортицы
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <Icon name="Calendar" className="text-white" size={24} />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 text-center">Свежая партия</h3>
                  <p className="text-sm md:text-base text-white/90 text-center">Прямые поставки. Свежий срок годности!</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <Icon name="Headphones" className="text-white" size={24} />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 text-center">Прямая поддержка</h3>
                  <p className="text-sm md:text-base text-white/90 text-center">
                    Консультация от производителя. Ответим на вопросы о применении и совместимости
                  </p>
                </div>
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-white text-[#339edc] hover:bg-white/90 text-base md:text-lg lg:text-xl px-8 md:px-12 py-4 md:py-6 font-bold shadow-xl w-full sm:w-auto"
                  onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Заказать со скидкой 40%
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
            <span itemProp="name">Преимущества Магния Хелат + Витамин В6</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              { icon: 'Zap', title: 'Снижает усталость', desc: 'Клинически доказано снижение усталости на 82% за 30 дней приёма' },
              { icon: 'Heart', title: 'Поддержка сердца', desc: 'Нормализует сердечный ритм и артериальное давление' },
              { icon: 'Brain', title: 'Улучшает концентрацию', desc: 'Повышает когнитивные функции и память на 67%' },
              { icon: 'Moon', title: 'Качество сна', desc: 'Улучшает качество сна и засыпание в 2.3 раза' },
              { icon: 'Activity', title: 'Энергия мышц', desc: 'Предотвращает судороги, повышает выносливость' },
              { icon: 'Smile', title: 'Стрессоустойчивость', desc: 'Снижает уровень кортизола и тревожности' }
            ].map((benefit, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow border-[#D4EAF2]">
                <CardContent className="pt-4 md:pt-6">
                  <div className="bg-[#E8F4F8] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <Icon name={benefit.icon} className="text-[#339edc]" size={24} />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 px-4 bg-[#E8F4F8]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Характеристики</h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Форма магния:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold text-right">Хелат (бисглицинат)</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Биодоступность:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold">95%</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Магний на капсулу:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold">416 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Витамин В6:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold">6 мг</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Капсул в упаковке:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold">120 шт</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#D4EAF2]">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm md:text-base font-semibold">Курс приема:</span>
                  <span className="text-sm md:text-base text-[#339edc] font-bold">30 дней</span>
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
                <div className="text-5xl font-bold text-[#339edc] mb-4">4 капсулы</div>
                <h3 className="text-xl font-bold mb-2">Дозировка</h3>
                <p className="text-muted-foreground">Порция 4 капсулы в день</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#339edc] mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2">Время приема</h3>
                <p className="text-muted-foreground">Утром и вечером во время еды</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#339edc] mb-4">30 дней</div>
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
    </>
  );
};

export default ProductInfo;