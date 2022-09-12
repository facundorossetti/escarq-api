const { Pool } = require('pg');
const axios = require('axios');
const mercadopago = require("mercadopago");


const access_token = "TEST-383328060791251-091020-33e8efc4f8bad45fa4083cd98453ff47-1195965134";

mercadopago.configure({
  access_token: access_token,
});

const buyItems = async (req, res) => {
  let preference = {
    items: [
      {
        title: "Remera TEST",
        unit_price: 1,
        quantity: 5,
      },
    ],
    "back_urls": {
      "success": "https://escarq-app.herokuapp.com/",
      "pending": "https://escarq-app.herokuapp.com/"
    },
    "notification_url": "https://frfullstackapp.herokuapp.com/api/notification"
  };
  let responseId = null;
  await mercadopago.preferences.create(preference)
    .then(function (response) {
      responseId = response;
    })
    .catch(function (error) {
      console.log(error);
    });
  res.send(responseId);
};

const getNotifications = async (req, res) => {
  console.log('ORDER REQUEST =>===>==>==>', req);
  const id = req.query.id;
  console.log('ORDER ID =>===>==>==>', id);
  // await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
  //   headers: {
  //     'Authorization': `Bearer ${access_token}` 
  //   }
  // })
  //   .then((r) => console.log('ORDER STATUS DATA =>===>==>==>', r.json()));
  // const {id, topic} = req.query;
  // use id to make request to https://api.mercadopago.com/v1/payments/${id} and check payment status
  // await pool.query('INSERT INTO mporders(id) VALUES($1)', [id]);
  res.status(201);
};

// prueba users
// Vendedor	
// TESTMJUWA1GH
// AAMh3IKUJD
// credencial de prueba
// TEST-383328060791251-091020-33e8efc4f8bad45fa4083cd98453ff47-1195965134
// credencial de production
// APP_USR-383328060791251-091020-484d8001c549792bf6985d3e03e8df5b-1195965134

// Comprador	
// TETE5006091
// 2A3tFC0Qr9



// facundo produccion
// Public Key
// APP_USR-0594fb27-6697-45fa-b7ea-c7c8c074a47b

// Access Token
// APP_USR-4834402556102402-091015-8e2f8c002341163f453b7e9e134dba7b-1021104201

// Client ID
// 4834402556102402

// Client Secret
// 61DkoeSgoSqZbIbVQB5in444FJx1BkDH

// facundo prueba
// Public Key
// TEST-794e4e34-fb22-4eab-ac9c-69c3283b2afc

// Access Token
// TEST-4834402556102402-091015-7732095e243a32f63f49bdd465daad9c-1021104201



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
  deleteProductById,
  buyItems,
  getNotifications,
  createProduct
};
