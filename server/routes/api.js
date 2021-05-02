const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth.js')

const router = express.Router();

router.get('/', (req, res) => {
  res.json('hello api');
});

router.post('/ezel', (req, res) => {
  const email = req.body.email
  User.findOne({'email': email}, (err, user) => {
    res.json({'email': email, 'ezel': !!user})
  })
});

router.post('/enrolla%C3%B1', (req, res) => {
  const email = req.body.email
  const psw = req.body.psw
  User.findOne({'email': email}, (err, user) => {
    res.json({'email': email, 'ezel': !!user})
  })
});

router.post('/kevrea%C3%B1',
  // middleware that handles the sign in process
  auth.signIn,
  // json handler
  auth.signJWTForUser
);

module.exports = router;
