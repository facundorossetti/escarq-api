const { Router } = require('express')
const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
} = require('../controllers/index.controller')

const router = Router()

// GET
router.get('/users', getUsers);
router.get('/', getUsers);
router.get('/users/:id', getUserById);

// POST
router.post('/users', createUser);

// DELETE
router.delete('/users/:id', deleteUserById);


module.exports = router;
