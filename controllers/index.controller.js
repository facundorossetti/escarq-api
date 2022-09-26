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
  try {
    await pool.query('SELECT * FROM users')
      .then((r) => res.send(r.rows));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('SELECT * FROM users WHERE id = $1', [id])
      .then((r) => res.send(r.rows));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [
      name,
      email,
      password
    ]).then(res.send('user created'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM users WHERE id = $1', [id])
      .then(res.send('User deleted.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//PRODUCTS
const getProducts = async (req, res) => {
  try {
    await pool.query('SELECT * FROM products')
      .then((r) => res.send(r.rows));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const createProduct = async (req, res) => {
  try {
    const { 
      id,
      description, 
      stock,
      price,
      imageurl
    } = req.body;
    await pool.query('INSERT INTO products(id, description, stock, price, imageurl) VALUES($1, $2, $3, $4, $5)', 
    [
      id,
      description,
      stock,
      price,
      imageurl
    ])
      .then(res.send('Product Added Successfully'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const updateProductStock = async (req, res) => {
  try {
    const { id, stock } = req.body;
    await pool.query('UPDATE products SET stock = $2 WHERE id = $1', [id, stock])
      .then(res.send('Product updated'));    
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProductPrice = async (req, res) => {
  try {
    const { id, price } = req.body;
    await pool.query('UPDATE products SET price = $2 WHERE id = $1', [id, price])
      .then(res.send('Product updated'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM products WHERE id = $1', [id])
      .then(res.send('User deleted.'));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  getProducts,
  createProduct,
  updateProductStock,
  updateProductPrice,
  deleteProductById
};
