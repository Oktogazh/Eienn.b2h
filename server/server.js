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

require('./models/User');

const server = express();

// Configure middlewares
server.use('*', cors());
server.use(morgan('tiny'));

server.set('view engine', 'ejs');

// Static folder
server.use(express.static(__dirname + '/views/'));

// Defining route middleware
server.use('/api', require('./routes/api'));

server.use('/stal', require('./routes/stal'));

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Listening to port
server.listen(port, err => {
  if (err) console.error('Error starting', err);
  else console.log(`Listening On http://localhost:${port}/api`);
});

module.exports = server;
