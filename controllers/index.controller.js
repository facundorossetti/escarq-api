const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: '5432',
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// USERS
const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.send(response.rows);
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  res.send(response.rows);
};
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [
    name,
    email,
    password
  ]);
  res.send('user created');
};
const deleteUserById = async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  res.send('User deleted.');
};

//PRODUCTS
const getProducts = async (req, res) => {
  const response = await pool.query('SELECT * FROM products');
  res.send(response.rows);
};
const createProduct = async (req, res) => {
  const { 
    id,
    type, 
    description, 
    color,
    stock,
    price,
    imageurl
  } = req.body;
  await pool.query('INSERT INTO products(id, type, description, color, stock, price, imageurl) VALUES($1, $2, $3, $4, $5, $6, $7)', 
  [
    id,
    type,
    description,
    color,
    stock,
    price,
    imageurl
  ]);
  res.send('Product Added Successfully');
};




const updateProduct = async (req, res) => {
  const {id, sizes} = req.body;
  function sumObjectsByKey(...objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }
  const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  const newObject = {};
  newObject.size = sumObjectsByKey(product.rows[0].stock.size, sizes);
  await pool.query('UPDATE products SET stock = $2 WHERE id = $1', [id, newObject]);
  res.send('Product updated');
};





const deleteProductById = async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.send('User deleted.');
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById
};
