CREATE TABLE products(id SERIAL PRIMARY KEY, type VARCHAR(40), description VARCHAR(100), size VARCHAR(10), color VARCHAR(10), stock int, price DECIMAL(10,2));

ALTER TABLE products ADD imageURL varchar(255);