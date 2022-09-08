// const { Pool } = require('pg')

// const pool = new Pool({
//   host: 'localhost',
//   user: 'facu',
//   password: '',
//   port: '5432',
//   database: 'escarq',
// });

const getUsers = async (req, res) => {
  // const response = await pool.query('SELECT * FROM users');
  res.send('getting users');
}

// const getUserById = async (req, res) => {
//   const id = req.params.id;
//   const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//   res.send(response.rows);
// }

// const createUser = async (req, res) => {
//   const { name, email } = req.body;
//   await pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [
//     name,
//     email,
//   ]);
//   res.send('user created:');
// }

// const deleteUserById = async (req, res) => {
//   const id = req.params.id;
//   await pool.query('DELETE FROM users WHERE id = $1', [id]);
//   res.send('User deleted.');
// }

module.exports = {
  getUsers,
  // getUserById,
  // createUser,
  // deleteUserById
}
