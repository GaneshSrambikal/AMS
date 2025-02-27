const express = require('express');
const morgan = require('morgan');
const app = express();

// middleware setup
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  return res.json({ message: 'Server started. Use /api endpoints to access.' });
});

app.get('/api', (req, res) => {
  res.json({ message: { author: 'Ganesh Srambikal' } });
});

module.exports = app;
