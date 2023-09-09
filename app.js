const express = require('express');

require('dotenv').config();

const connectDb = require('./Db/db');
const createTrack = require('./src/routes/app');
const getTrackRoute = require('./src/routes/get_route');
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

app.use('/hng/task1/api', getTrackRoute);
app.use('/hng/task1/api', createTrack);

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
