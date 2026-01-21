ALTER TABLE t_p86642755_magnesium_b6_page.orders 
ADD COLUMN IF NOT EXISTS order_id VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_order_id 
ON t_p86642755_magnesium_b6_page.orders(order_id);

ALTER TABLE t_p86642755_magnesium_b6_page.orders 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;