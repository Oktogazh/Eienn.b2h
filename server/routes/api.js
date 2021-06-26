const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth');
const verifyEmail = require('../middlewares/verifyEmail');
const { body } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('hello api');
});

router.post('/enrolla%C3%B1',
  // middleware that creates a new user doc
  auth.register,
  // create a token
  auth.signJWTForUser
);

router.post('/ezel',
  body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).trim(),
  (req, res) => {
  console.log(req.body.email)
  const email = req.body.email
  User.findOne({'email': email}, (err, user) => {
    res.json({'email': email, 'ezel': !!user})
  })
});

router.post('/gwiriekaat',
  auth.requireJWT,
  verifyEmail.verify
);

router.post('/kas_kod_postel',
  auth.requireJWT,
  // send the verification email
  verifyEmail.sendCode,
  (req, res) => {
  res.status(200).send('Emeur o paouez kas ar c\'hod da ' + req.user.email + '.');
 }
);

router.post('/kevrea%C3%B1',
  // middleware that handles the sign in process
  auth.signIn,
  // json handler
  auth.signJWTForUser
);

router.use('/stal', require('./stal'));

module.exports = router;
