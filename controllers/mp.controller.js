const { Pool } = require('pg');
const axios = require('axios');
const mercadopago = require("mercadopago");

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

const access_token = process.env.ACCESS_TOKEN;

mercadopago.configure({
  access_token: access_token,
});

const getPayments = async (req, res) => {
  try {
    await pool.query('SELECT * FROM payments')
      .then((r) => res.send(r.rows));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    await pool.query('SELECT * FROM merchant_orders')
      .then((r) => res.send(r.rows));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const buyItems = async (req, res) => {
  try {
    if (req.body) {
      const preference = {
        items: req.body.items,
        payer: req.body.payerData,
        "back_urls": {
          "success": "http://www.nostylist.com.ar/",
          "pending": "http://www.nostylist.com.ar/"
        },
        "auto_return": "approved",
        "notification_url": "https://frfullstackapp.herokuapp.com/api/notification"
      };
      await mercadopago.preferences.create(preference)
        .then((response) => res.send(response))
        .catch((error) => console.log(error));
    } else {
      res.send('No preference found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const getNotifications = async (req, res) => {
  // OBTENER DATOS DE ORDENES DE COMPRA
  if (req.query.topic && req.query.topic === 'merchant_order') {
    const orderId = req.query.id;
    if (orderId) {
      await axios.get(`https://api.mercadopago.com/merchant_orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}` 
        }
      })
      .then((r) => {
        const items = JSON.stringify(r.data.items);
        pool.query('INSERT INTO merchant_orders (id, items, amount, date_created, payments) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET items = excluded.items, amount = excluded.amount', [
          r.data.id,
          items,
          r.data.total_amount,
          r.data.date_created,
          r.data.payments
        ]);
        res.status(201);
      })
      .catch(error => console.err(error));
    }
  }

  // OBTENER DATOS DE PAGOS
  if (req.query.topic && req.query.topic === 'payment') {
    const paymentId = req.query.id;
    if(paymentId) {
      await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}` 
        }
      })
      .then((r) => {
        const payer = JSON.stringify(r.data.payer);
        pool.query('INSERT INTO payments (id, orderdata, payer, status, detail, amount, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET orderdata = excluded.orderdata, payer = excluded.payer, status = excluded.status, detail = excluded.detail, amount = excluded.amount, date_created = excluded.date_created', [
          r.data.id,
          r.data.order,
          payer,
          r.data.status,
          r.data.status_detail,
          r.data.transaction_amount,
          r.data.date_created
        ]);
        res.status(201);
      })
      .catch(error => 
        console.err(error)
      );
    }
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    await pool.query('UPDATE merchant_orders SET status = $2 WHERE id = $1', [id, status])
      .then(() => res.send('status updated successfully'));
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  buyItems,
  getNotifications,
  getPayments,
  changeOrderStatus,
  getOrders
};
