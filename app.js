const express = require('express');

require('dotenv').config();

// const createTrack = require('./src/routes/app');
const getTrackRoute = require('./src/routes/get_route');
const app = express();

// Middlewares
app.use(express.json());
app.use('/hng/task1/api', getTrackRoute);
// app.use('/hng/task1/api', createTrack);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500).json({ error: err.message });
// });

module.exports = app;
