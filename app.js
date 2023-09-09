const express = require('express');

require('dotenv').config();

const getTrackRoute = require('./src/routes/get_route');
const app = express();

// Middlewares
app.use(express.json());
app.use('/hng/task1/api', getTrackRoute);

// 404 response
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

module.exports = app;
