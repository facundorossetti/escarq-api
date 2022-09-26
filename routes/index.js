const { Router } = require('express');
require('dotenv').config();

const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  createProduct,
  deleteProductById,
  updateProductStock,
  updateProductPrice,
  getProducts
} = require('../controllers/index.controller');

const {
  buyItems,
  getNotifications,
  getPayments,
  changeOrderStatus,
  getOrders
} = require('../controllers/mp.controller');

const router = Router();

// Mercadopago
router.post('/mercadopago', buyItems);
router.post('/api/notification', getNotifications);

router.get('/payments', getPayments);
router.get('/orders', getOrders);
router.patch('/order/:id/:status', changeOrderStatus);

//PRODUCTS
// GET
router.get('/products', getProducts);
// POST
router.post('/products', createProduct);
router.patch('/updateProductStock', updateProductStock);
router.patch('/updateProductPrice', updateProductPrice);
// DELETE
router.delete('/products/:id', deleteProductById);

//  ================================================= //

//USERS
// GET
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
// POST
router.post('/users', createUser);
// DELETE
router.delete('/users/:id', deleteUserById);

module.exports = router;
