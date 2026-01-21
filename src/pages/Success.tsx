import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] to-white flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-2xl border-2 border-[#339edc]">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" className="text-green-600" size={64} />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            Оплата прошла успешно!
          </h1>

          <p className="text-xl text-muted-foreground mb-2">
            Спасибо за ваш заказ!
          </p>

          {orderId && (
            <p className="text-lg text-muted-foreground mb-8">
              Номер заказа: <span className="font-bold text-[#339edc]">#{orderId}</span>
            </p>
          )}

          <div className="bg-[#E8F4F8] p-6 rounded-xl mb-8">
            <div className="flex items-start gap-4 text-left">
              <Icon name="Info" className="text-[#339edc] flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">Что дальше?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Mail" className="flex-shrink-0 mt-1" size={18} />
                    <span>На ваш email отправлено подтверждение заказа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Phone" className="flex-shrink-0 mt-1" size={18} />
                    <span>Мы свяжемся с вами в течение 1 часа для уточнения деталей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Truck" className="flex-shrink-0 mt-1" size={18} />
                    <span>Отправка заказа в течение 1-2 рабочих дней</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Package" className="flex-shrink-0 mt-1" size={18} />
                    <span>Доставка 3-7 дней в зависимости от региона</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full bg-[#339edc] hover:bg-[#2889c4] text-white text-lg"
              onClick={() => window.location.href = '/'}
            >
              Вернуться на главную
            </Button>

            <p className="text-sm text-muted-foreground">
              Автоматическое перенаправление через {countdown} сек...
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Возникли вопросы? Свяжитесь с нами:
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <a 
                href="tel:+79001234567" 
                className="flex items-center gap-2 text-[#339edc] hover:underline"
              >
                <Icon name="Phone" size={18} />
                <span>+7 (900) 123-45-67</span>
              </a>
              <a 
                href="mailto:info@pharmexpert.ru" 
                className="flex items-center gap-2 text-[#339edc] hover:underline"
              >
                <Icon name="Mail" size={18} />
                <span>info@pharmexpert.ru</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
