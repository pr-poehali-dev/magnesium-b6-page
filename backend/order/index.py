import json
import os
import smtplib
import uuid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from urllib.request import Request, urlopen
from urllib.parse import urlencode
import psycopg2
import threading


def handler(event: dict, context) -> dict:
    """
    API для обработки заказов и webhook от ЮКassa
    """
    method = event.get('httpMethod', 'GET')
    path = event.get('requestContext', {}).get('http', {}).get('path', '')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method == 'POST' and 'webhook' in str(path):
        body = json.loads(event.get('body', '{}'))
        
        event_type = body.get('event', '')
        
        if event_type == 'payment.succeeded':
            payment_obj = body.get('object', {})
            
            order_id = payment_obj.get('metadata', {}).get('orderId', 'unknown')
            amount = payment_obj.get('amount', {}).get('value', '0')
            email = payment_obj.get('metadata', {}).get('email', '')
            
            order_data = {
                'orderId': order_id,
                'totalPrice': int(float(amount)),
                'fullName': payment_obj.get('description', ''),
                'email': email
            }
            
            update_order_payment_status(order_id, 'paid')
            
            # Асинхронная отправка уведомлений
            threading.Thread(
                target=send_notifications_async,
                args=(order_data, 'payment_success')
            ).start()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'status': 'ok'})
        }

    if method == 'GET':
        query_params = event.get('queryStringParameters', {}) or {}
        
        if query_params.get('action') == 'address':
            query = query_params.get('query', '')
            suggestions = get_address_suggestions(query)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'suggestions': suggestions})
            }
        
        try:
            orders = get_all_orders()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'orders': orders})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)})
            }

    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        
        full_name = body.get('fullName', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        address = body.get('address', '')
        delivery_method = body.get('deliveryMethod', '')
        payment_method = body.get('paymentMethod', 'card')
        quantity = body.get('quantity', 1)
        
        total_price = 1230 * quantity
        order_id = str(uuid.uuid4())[:8]
        
        order_data = {
            'orderId': order_id,
            'fullName': full_name,
            'phone': phone,
            'email': email,
            'address': address,
            'deliveryMethod': delivery_method,
            'paymentMethod': payment_method,
            'quantity': quantity,
            'totalPrice': total_price
        }
        
        save_order_to_db(order_data)
        
        # Асинхронная отправка уведомлений (не блокирует ответ)
        threading.Thread(
            target=send_notifications_async,
            args=(order_data, 'new_order')
        ).start()
        
        payment_url = create_yookassa_payment(order_data)
        
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
            })
        }

    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }


def send_notifications_async(order_data: dict, notification_type: str):
    """Асинхронная отправка всех уведомлений"""
    try:
        send_telegram_notification(order_data, notification_type)
        send_email_notification(order_data, notification_type)
    except Exception as e:
        print(f"Notification error: {e}")


def send_email_notification(order_data: dict, notification_type: str):
    """Отправка email уведомления"""
    email_user = os.environ.get('EMAIL_USER')
    email_password = os.environ.get('EMAIL_PASSWORD')
    email_to = os.environ.get('EMAIL_TO')
    email_host = os.environ.get('EMAIL_HOST')
    email_port = int(os.environ.get('EMAIL_PORT', 587))
    
    if not all([email_user, email_password, email_to, email_host]):
        return
    
    msg = MIMEMultipart('alternative')
    
    if notification_type == 'new_order':
        msg['Subject'] = f"Новый заказ #{order_data['orderId']}"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #339edc;">Новый заказ на сайте</h2>
                <p><strong>Номер заказа:</strong> {order_data['orderId']}</p>
                <p><strong>ФИО:</strong> {order_data['fullName']}</p>
                <p><strong>Телефон:</strong> {order_data['phone']}</p>
                <p><strong>Email:</strong> {order_data['email']}</p>
                <p><strong>Адрес доставки:</strong> {order_data['address']}</p>
                <p><strong>Служба доставки:</strong> {order_data['deliveryMethod']}</p>
                <p><strong>Способ оплаты:</strong> {order_data['paymentMethod']}</p>
                <p><strong>Количество:</strong> {order_data['quantity']} шт</p>
                <p><strong>Сумма:</strong> {order_data['totalPrice']} ₽</p>
            </body>
        </html>
        """
    else:
        msg['Subject'] = f"Оплата заказа #{order_data['orderId']}"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #28a745;">Заказ успешно оплачен</h2>
                <p><strong>Номер заказа:</strong> {order_data['orderId']}</p>
                <p><strong>ФИО:</strong> {order_data.get('fullName', 'N/A')}</p>
                <p><strong>Email:</strong> {order_data.get('email', 'N/A')}</p>
                <p><strong>Сумма:</strong> {order_data['totalPrice']} ₽</p>
            </body>
        </html>
        """
    
    msg['From'] = email_user
    msg['To'] = email_to
    
    part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(part)
    
    try:
        with smtplib.SMTP(email_host, email_port) as server:
            server.starttls()
            server.login(email_user, email_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Email error: {e}")


def send_telegram_notification(order_data: dict, notification_type: str):
    """Отправка Telegram уведомления"""
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
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
    
    if notification_type == 'new_order':
        delivery_name = delivery_names.get(order_data.get('deliveryMethod', ''), order_data.get('deliveryMethod', 'N/A'))
        payment_name = payment_names.get(order_data.get('paymentMethod', 'card'), 'Банковская карта')
        
        message = f"""
🛒 <b>Новый заказ #{order_data['orderId']}</b>

📦 <b>Товар:</b> Магний Хелат + Витамин В6
🔢 <b>Количество:</b> {order_data['quantity']} шт
💰 <b>Сумма:</b> {order_data['totalPrice']} ₽

👤 <b>Клиент:</b> {order_data['fullName']}
📞 <b>Телефон:</b> {order_data['phone']}
📧 <b>Email:</b> {order_data['email']}

📍 <b>Адрес:</b> {order_data['address']}
🚚 <b>Доставка:</b> {delivery_name}
💳 <b>Способ оплаты:</b> {payment_name}
        """
    else:
        message = f"""
✅ <b>Заказ оплачен #{order_data['orderId']}</b>

📦 <b>Товар:</b> Магний Хелат + Витамин В6
💰 <b>Сумма:</b> {order_data['totalPrice']} ₽

👤 <b>Клиент:</b> {order_data.get('fullName', 'N/A')}
📧 <b>Email:</b> {order_data.get('email', 'N/A')}
        """
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    try:
        req = Request(url, data=urlencode(data).encode('utf-8'), method='POST')
        with urlopen(req) as response:
            response.read()
    except Exception as e:
        print(f"Telegram error: {e}")


def get_address_suggestions(query: str):
    """Получение подсказок адресов из DaData"""
    if len(query) < 3:
        return []
    
    api_token = os.environ.get('DADATA_API_TOKEN')
    
    if not api_token:
        return []
    
    try:
        url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
        
        req = Request(
            url,
            data=json.dumps({'query': query, 'count': 5}).encode('utf-8'),
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Token {api_token}'
            },
            method='POST'
        )
        
        with urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data.get('suggestions', [])
    except Exception as e:
        print(f"DaData error: {e}")
        return []


def get_all_orders():
    """Получение всех заказов из БД"""
    database_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not database_url:
        return []
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        query = f"""
            SELECT id, order_id, full_name, phone, email, address, 
                   delivery_method, payment_method, quantity, total_price, 
                   payment_status, created_at, updated_at
            FROM {schema}.orders
            ORDER BY created_at DESC
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        orders = []
        for row in rows:
            orders.append({
                'id': row[0],
                'orderId': row[1],
                'fullName': row[2],
                'phone': row[3],
                'email': row[4],
                'address': row[5],
                'deliveryMethod': row[6],
                'paymentMethod': row[7],
                'quantity': row[8],
                'totalPrice': row[9],
                'paymentStatus': row[10],
                'createdAt': row[11].isoformat() if row[11] else None,
                'updatedAt': row[12].isoformat() if row[12] else None
            })
        
        cursor.close()
        conn.close()
        
        return orders
    except Exception as e:
        print(f"DB fetch error: {e}")
        return []


def save_order_to_db(order_data: dict):
    """Сохранение заказа в базу данных"""
    database_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not database_url:
        return
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        query = f"""
            INSERT INTO {schema}.orders 
            (order_id, full_name, phone, email, address, delivery_method, payment_method, quantity, total_price, payment_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(query, (
            order_data['orderId'],
            order_data['fullName'],
            order_data['phone'],
            order_data['email'],
            order_data['address'],
            order_data['deliveryMethod'],
            order_data['paymentMethod'],
            order_data['quantity'],
            order_data['totalPrice'],
            'pending'
        ))
        
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"DB save error: {e}")


def update_order_payment_status(order_id: str, status: str):
    """Обновление статуса оплаты заказа"""
    database_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    if not database_url:
        return
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        query = f"""
            UPDATE {schema}.orders 
            SET payment_status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = %s
        """
        
        cursor.execute(query, (status, order_id))
        
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"DB update error: {e}")


def create_yookassa_payment(order_data: dict) -> str:
    """Создание платежа в ЮКassa"""
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    
    if not shop_id or not secret_key:
        return 'https://example.com/payment'
    
    payment_data = {
        'amount': {
            'value': f"{order_data['totalPrice']}.00",
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': f"https://preview--magnesium-b6-page.poehali.dev/success?orderId={order_data['orderId']}"
        },
        'capture': True,
        'description': f"Заказ #{order_data['orderId']} - Магний Хелат + Витамин В6",
        'metadata': {
            'orderId': order_data['orderId'],
            'email': order_data['email']
        }
    }
    
    url = 'https://api.yookassa.ru/v3/payments'
    
    try:
        import base64
        credentials = base64.b64encode(f"{shop_id}:{secret_key}".encode()).decode()
        
        req = Request(
            url,
            data=json.dumps(payment_data).encode('utf-8'),
            headers={
                'Authorization': f'Basic {credentials}',
                'Content-Type': 'application/json',
                'Idempotence-Key': str(uuid.uuid4())
            },
            method='POST'
        )
        
        with urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result.get('confirmation', {}).get('confirmation_url', '')
    except Exception as e:
        print(f"YooKassa error: {e}")
        return 'https://example.com/payment'