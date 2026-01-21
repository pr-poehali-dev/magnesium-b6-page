import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const orderSchema = z.object({
  fullName: z.string().min(1, 'Введите ФИО'),
  phone: z.string().min(10, 'Введите номер телефона'),
  email: z.string().email('Введите корректный email'),
  address: z.string().min(5, 'Введите адрес'),
  deliveryMethod: z.string().min(1, 'Выберите службу доставки'),
  paymentMethod: z.string(),
  quantity: z.number().min(1).max(10)
});

type OrderFormData = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const { toast } = useToast();
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      deliveryMethod: '',
      paymentMethod: 'card',
      quantity: 1
    }
  });

  const orderForm = watch();

  const handleAddressChange = async (value: string) => {
    setValue('address', value, { shouldValidate: true });
    
    if (value.length < 3) {
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(`https://functions.poehali.dev/4df9a0f0-987a-4e07-9b2f-bf9d2057dfce?action=address&query=${encodeURIComponent(value)}`);
      const data = await response.json();
      setAddressSuggestions(data.suggestions || []);
      setShowSuggestions(data.suggestions && data.suggestions.length > 0);
    } catch (error) {
      console.error('Address suggestions error:', error);
      setShowSuggestions(false);
    }
  };

  const selectAddress = (suggestion: any) => {
    setValue('address', suggestion.value, { shouldValidate: true });
    setShowSuggestions(false);
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      console.log('Отправка заказа:', data);
      
      const response = await fetch('https://functions.poehali.dev/4df9a0f0-987a-4e07-9b2f-bf9d2057dfce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('Response data:', result);

      if (result.paymentUrl) {
        console.log('Редирект на:', result.paymentUrl);
        window.location.href = result.paymentUrl;
      } else {
        throw new Error('Не получен URL оплаты');
      }
    } catch (error) {
      console.error('Ошибка заказа:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось оформить заказ. Попробуйте позже.",
        variant: "destructive"
      });
    }
  };

  const totalPrice = 1230 * orderForm.quantity;

  return (
    <section id="order-form" className="py-20 px-4 bg-gradient-to-br from-white to-[#E8F4F8]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card p-8 rounded-2xl shadow-2xl border-2 border-[#339edc]">
          <h2 className="text-3xl font-bold text-center mb-2">Оформить заказ</h2>
          <p className="text-center text-muted-foreground mb-8">
            Заполните форму, и мы свяжемся с вами для подтверждения
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="fullName">ФИО *</Label>
              <Input
                id="fullName"
                placeholder="Иванов Иван Иванович"
                {...register('fullName')}
                className="mt-2"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={orderForm.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('phone', e.target.value, { shouldValidate: true })}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="phone"
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      className="mt-2"
                    />
                  )}
                </InputMask>
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  {...register('email')}
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="address">Адрес доставки *</Label>
              <Input
                id="address"
                placeholder="Город, улица, дом, квартира"
                value={orderForm.address}
                onChange={(e) => handleAddressChange(e.target.value)}
                className="mt-2"
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
              )}
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
                      {suggestion.data?.postal_code && (
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
                onValueChange={(value) => setValue('deliveryMethod', value, { shouldValidate: true })}
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
              {errors.deliveryMethod && (
                <p className="text-sm text-red-500 mt-1">{errors.deliveryMethod.message}</p>
              )}
            </div>

            <div>
              <Label>Способ оплаты *</Label>
              <RadioGroup 
                value={orderForm.paymentMethod} 
                onValueChange={(value) => setValue('paymentMethod', value)}
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
                  onChange={(e) => setValue('quantity', parseInt(e.target.value) || 1)}
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
              disabled={isSubmitting}
              className="w-full bg-[#339edc] hover:bg-[#2889c4] text-white text-xl py-8 disabled:opacity-50"
            >
              {isSubmitting ? 'Обработка...' : 'Перейти к оплате'}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
