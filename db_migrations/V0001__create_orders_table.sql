CREATE TABLE IF NOT EXISTS t_p86642755_magnesium_b6_page.orders (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    delivery_method VARCHAR(50) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price INTEGER NOT NULL,
    payment_id VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);