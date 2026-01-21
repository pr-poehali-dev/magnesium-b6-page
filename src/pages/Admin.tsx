import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Order {
  id: number;
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  paymentMethod: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://functions.poehali.dev/4df9a0f0-987a-4e07-9b2f-bf9d2057dfce');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает оплаты', className: 'bg-yellow-500' },
      paid: { label: 'Оплачен', className: 'bg-green-500' },
      cancelled: { label: 'Отменен', className: 'bg-red-500' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deliveryMethods = {
    cdek: 'СДЭК',
    yandex: 'Яндекс Доставка',
    ozon: 'Ozon Доставка',
    wb: 'WB Доставка',
    russianpost: 'Почта РФ'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Админ-панель</h1>
              <p className="text-muted-foreground">Управление заказами</p>
            </div>
          </div>
          <Button onClick={fetchOrders} className="bg-[#339edc] hover:bg-[#2889c4]">
            <Icon name="RefreshCw" size={18} className="mr-2" />
            Обновить
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Все заказы ({orders.length})</span>
              <div className="flex gap-4 text-sm font-normal text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Оплачено: {orders.filter(o => o.paymentStatus === 'paid').length}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  Ожидает: {orders.filter(o => o.paymentStatus === 'pending').length}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Icon name="Loader" className="animate-spin text-[#339edc]" size={48} />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Package" className="mx-auto text-muted-foreground mb-4" size={64} />
                <p className="text-xl text-muted-foreground">Заказов пока нет</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ Заказа</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Кол-во</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-[#E8F4F8]/50">
                        <TableCell className="font-mono font-semibold text-[#339edc]">
                          #{order.orderId}
                        </TableCell>
                        <TableCell>{order.fullName}</TableCell>
                        <TableCell className="font-mono">{order.phone}</TableCell>
                        <TableCell>{order.quantity} шт</TableCell>
                        <TableCell className="font-semibold">{order.totalPrice.toLocaleString()} ₽</TableCell>
                        <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openOrderDetails(order)}
                          >
                            <Icon name="Eye" size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} className="text-[#339edc]" />
              Детали заказа #{selectedOrder?.orderId}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Информация о клиенте</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="User" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">ФИО</p>
                        <p className="font-semibold">{selectedOrder.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Phone" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p className="font-mono">{selectedOrder.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Mail" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{selectedOrder.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Доставка и оплата</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="MapPin" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Адрес</p>
                        <p className="text-sm">{selectedOrder.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Truck" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Служба доставки</p>
                        <p>{deliveryMethods[selectedOrder.deliveryMethod as keyof typeof deliveryMethods]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="CreditCard" size={16} className="text-[#339edc] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Способ оплаты</p>
                        <p>{selectedOrder.paymentMethod === 'card' ? 'Банковская карта' : 'СБП'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#E8F4F8] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Количество:</span>
                  <span className="font-semibold">{selectedOrder.quantity} шт</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Цена за единицу:</span>
                  <span className="font-semibold">1 230 ₽</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-2xl font-bold text-[#339edc]">
                    {selectedOrder.totalPrice.toLocaleString()} ₽
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Дата создания</p>
                  <p className="font-semibold">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  {getStatusBadge(selectedOrder.paymentStatus)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
