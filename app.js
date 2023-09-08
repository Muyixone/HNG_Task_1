const express = require('express');

require('dotenv').config();

const connectDb = require('./Db/db');
const app = express();
const PORT = process.env.PORT;

app.get('/hng', (req, res) => {
  return res.status(200).json({ message: 'Success' });
});

// Connect to DB and server
const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`DB connected, Server listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
