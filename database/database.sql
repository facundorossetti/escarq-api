CREATE TABLE products(id INT PRIMARY KEY, type VARCHAR(40), description VARCHAR(100), color VARCHAR(10), stock JSON, price DECIMAL(10,2), imageURL varchar(255));

CREATE TABLE merchant_orders(id BIGINT PRIMARY KEY, items JSON, amount DECIMAL(10,2));
CREATE TABLE payments(id INT PRIMARY KEY, orderdata JSON, payer JSON, status VARCHAR(10), detail VARCHAR(10), amount DECIMAL(10,2));

CREATE TABLE test2(id INT PRIMARY KEY, amount INT, amount2 INT);

SELECT * FROM test;

-- SYNTAX IF ID EXISTS
INSERT INTO test2 (id, amount, amount2) 
VALUES (2, '200', '100')
ON CONFLICT (id) DO UPDATE 
  SET amount = excluded.amount,
      amount2 = excluded.amount2;

INSERT INTO payments (id, orderdata, payer, status, detail, amount)
VALUES (140, '{"ids": 580, "registred": "some"}', '{"somepayer": "580", "payerinfo": "some"}', 'registred', 'acredited', 200)
ON CONFLICT (id) DO UPDATE 
  SET orderdata = excluded.orderdata,
      payer = excluded.payer,
      status = excluded.status,
      detail = excluded.detail,
      amount = excluded.amount;

ALTER TABLE merchant_orders ALTER COLUMN status SET DEFAULT 'pendiente';

ALTER TABLE merchant_orders ALTER COLUMN id type bigint using id::bigint

-- add columns
ALTER TABLE merchant_orders ADD COLUMN date_created DATE;
ALTER TABLE payments ADD COLUMN date_approved DATE;
ALTER TABLE payments ADD COLUMN date_created DATE;


DROP TABLE merchant_orders;

INSERT INTO payments(id, orderdata, payer, status, detail, amount) VALUES(140, '{"ids": 580, "registred": "some"}', '{"somepayer": "580", "payerinfo": "some"}', 'registred', 'acredited', 200);
