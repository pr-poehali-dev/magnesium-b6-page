import json
import os
import smtplib
import uuid
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    '''API для обработки заказов с уведомлениями на email и Telegram, интеграция с ЮКassa'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        full_name = body.get('fullName', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        address = body.get('address', '')
        delivery_method = body.get('deliveryMethod', '')
        payment_method = body.get('paymentMethod', 'card')
        quantity = int(body.get('quantity', 1))
        
        total_price = 1230 * quantity
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute('''
            INSERT INTO t_p86642755_magnesium_b6_page.orders 
            (full_name, phone, email, address, delivery_method, payment_method, quantity, total_price)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        ''', (full_name, phone, email, address, delivery_method, payment_method, quantity, total_price))
        
        order_id = cur.fetchone()[0]
        conn.commit()
        
        send_email_notification(order_id, full_name, phone, email, address, delivery_method, payment_method, quantity, total_price)
        send_telegram_notification(order_id, full_name, phone, email, address, delivery_method, payment_method, quantity, total_price)
        
        payment_url = create_yookassa_payment(order_id, total_price, email, payment_method)
        
        cur.execute('''
            UPDATE t_p86642755_magnesium_b6_page.orders 
            SET payment_id = %s 
            WHERE id = %s
        ''', (payment_url.split('/')[-1] if payment_url else None, order_id))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'orderId': order_id,
                'paymentUrl': payment_url
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def send_email_notification(order_id, full_name, phone, email, address, delivery_method, payment_method, quantity, total_price):
    '''Отправка email уведомления о новом заказе'''
    try:
        email_host = os.environ.get('EMAIL_HOST', 'smtp.mail.ru')
        email_port = int(os.environ.get('EMAIL_PORT', '587'))
        email_user = os.environ.get('EMAIL_USER', '')
        email_password = os.environ.get('EMAIL_PASSWORD', '')
        email_to = os.environ.get('EMAIL_TO', '89287730553@mail.ru')
        
        if not email_user or not email_password:
            return
        
        delivery_names = {
            'cdek': 'СДЭК',
            'yandex': 'Яндекс Доставка',
            'ozon': 'Ozon Доставка',
            'wb': 'WB Доставка',
            'russianpost': 'Почта РФ'
        }
        
        payment_names = {
            'card': 'Банковская карта',
            'sbp': 'СБП'
        }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новый заказ #{order_id} — PharmExpert'
        msg['From'] = email_user
        msg['To'] = email_to
        
        html = f'''
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                    <h2 style="color: #E89244;">🛒 Новый заказ #{order_id}</h2>
                    <hr style="border: 1px solid #F5E6D3;">
                    
                    <h3>Информация о клиенте:</h3>
                    <p><strong>ФИО:</strong> {full_name}</p>
                    <p><strong>Телефон:</strong> {phone}</p>
                    <p><strong>Email:</strong> {email}</p>
                    
                    <h3>Доставка:</h3>
                    <p><strong>Адрес:</strong> {address}</p>
                    <p><strong>Служба:</strong> {delivery_names.get(delivery_method, delivery_method)}</p>
                    
                    <h3>Заказ:</h3>
                    <p><strong>Товар:</strong> D3 Max + Vitamin K2</p>
                    <p><strong>Количество:</strong> {quantity} шт.</p>
                    <p><strong>Сумма:</strong> {total_price} ₽</p>
                    <p><strong>Оплата:</strong> {payment_names.get(payment_method, payment_method)}</p>
                    
                    <hr style="border: 1px solid #F5E6D3; margin-top: 30px;">
                    <p style="color: #666; font-size: 14px;">PharmExpert — Экспертный подход к вашему здоровью</p>
                </div>
            </body>
        </html>
        '''
        
        part = MIMEText(html, 'html', 'utf-8')
        msg.attach(part)
        
        server = smtplib.SMTP(email_host, email_port)
        server.starttls()
        server.login(email_user, email_password)
        server.send_message(msg)
        server.quit()
        
    except Exception as e:
        print(f'Email error: {e}')


def send_telegram_notification(order_id, full_name, phone, email, address, delivery_method, payment_method, quantity, total_price):
    '''Отправка уведомления в Telegram'''
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        
        if not bot_token or not chat_id:
            return
        
        delivery_names = {
            'cdek': 'СДЭК',
            'yandex': 'Яндекс Доставка',
            'ozon': 'Ozon Доставка',
            'wb': 'WB Доставка',
            'russianpost': 'Почта РФ'
        }
        
        payment_names = {
            'card': 'Банковская карта',
            'sbp': 'СБП'
        }
        
        message = f'''🛒 <b>Новый заказ #{order_id}</b>

👤 <b>Клиент:</b>
{full_name}
📞 {phone}
📧 {email}

📦 <b>Доставка:</b>
{delivery_names.get(delivery_method, delivery_method)}
📍 {address}

🛍 <b>Заказ:</b>
D3 Max + Vitamin K2
Количество: {quantity} шт.

💰 <b>Сумма:</b> {total_price} ₽
💳 {payment_names.get(payment_method, payment_method)}
'''
        
        url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = {
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }
        
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        urllib.request.urlopen(req)
        
    except Exception as e:
        print(f'Telegram error: {e}')


def create_yookassa_payment(order_id, amount, customer_email, payment_method):
    '''Создание платежа в ЮКassa'''
    try:
        shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
        secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')
        
        if not shop_id or not secret_key:
            return None
        
        idempotence_key = str(uuid.uuid4())
        
        payment_data = {
            'amount': {
                'value': f'{amount}.00',
                'currency': 'RUB'
            },
            'confirmation': {
                'type': 'redirect',
                'return_url': 'https://preview-bmw-coding-site.poehali.dev/'
            },
            'capture': True,
            'description': f'Заказ #{order_id} — PharmExpert',
            'receipt': {
                'customer': {
                    'email': customer_email
                },
                'items': [{
                    'description': 'D3 Max + Vitamin K2',
                    'quantity': '1',
                    'amount': {
                        'value': f'{amount}.00',
                        'currency': 'RUB'
                    },
                    'vat_code': 1
                }]
            }
        }
        
        if payment_method == 'sbp':
            payment_data['payment_method_data'] = {'type': 'sbp'}
        
        credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()
        
        url = 'https://api.yookassa.ru/v3/payments'
        req = urllib.request.Request(
            url,
            data=json.dumps(payment_data).encode('utf-8'),
            headers={
                'Content-Type': 'application/json',
                'Idempotence-Key': idempotence_key,
                'Authorization': f'Basic {credentials}'
            }
        )
        
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode('utf-8'))
        
        return result.get('confirmation', {}).get('confirmation_url')
        
    except Exception as e:
        print(f'YooKassa error: {e}')
        return None
