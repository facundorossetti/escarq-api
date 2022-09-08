const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(require('../routes/index'));

app.listen(port);
console.log('Listening on port: ' + port);
