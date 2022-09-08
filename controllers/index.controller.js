const { Pool } = require('pg')

const pool = new Pool({
  host: 'ec2-44-207-126-176.compute-1.amazonaws.com',
  user: 'oukdulfgzycetj',
  password: 'b27d33b0bbd60799a36fd83fb64924c2ccc119ea9ea65d695ac3802a1e9a1e97',
  port: '5432',
  database: 'dbqmrqbn1vl7mt',
  ssl: {
    rejectUnauthorized: false,
  },
});

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.send(response.rows);
}

const getUserById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  res.send(response.rows);
}

const createUser = async (req, res) => {
  const { name, email } = req.body;
  await pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [
    name,
    email,
  ]);
  res.send('user created:');
}

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  res.send('User deleted.');
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById
}
