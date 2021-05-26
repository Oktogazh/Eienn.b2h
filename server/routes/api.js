const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth');
const verifyEmail = require('../middlewares/verifyEmail');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json('hello api');
});

router.post('/customer',
  // populate the req.user object
  auth.requireJWT,
  // async creation of the user
  async (req, res) => {
    const email = req.user.email;
    const customer = await stripe.customers.create({
      email: email,
      // link the BE userId with the customer
      metadata: {
        userId: req.user.id
      }
    });

    //link the customerId to the BE user
    const user = await User.findOne({_id: req.user.id})
    user.customerId = customer.id
    user.save();
    // send back the saved id
    res.json({email, id: customer.id})
  }

);

router.post('/enrolla%C3%B1',
  // middleware that creates a new user doc
  auth.register,
  // create a token
  auth.signJWTForUser
);

router.post('/ezel',
  body('email').isEmail().normalizeEmail({ gmail_remove_dots: false }).trim(),
  (req, res) => {
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

module.exports = router;
