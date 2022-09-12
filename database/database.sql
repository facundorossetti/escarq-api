CREATE TABLE products(id INT PRIMARY KEY, type VARCHAR(40), description VARCHAR(100), color VARCHAR(10), stock JSON, price DECIMAL(10,2), imageURL varchar(255));

CREATE TABLE mporders(id INT, DateCreated DATETIME NOT NULL DEFAULT(GETDATE()));