const app = require('./app');
const PORT = process.env.PORT;

const connectDb = require('./Db/db');

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
