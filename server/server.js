// Importing required modules
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;

require('./config/mongoose');
require('./models/User');

const app = express();

// Configure middlewares
app.use('*', cors());
app.use(express.json());
app.use(morgan('tiny'));

app.set('view engine', 'ejs');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
