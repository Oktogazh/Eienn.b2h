const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth');
const verifyEmail = require('../middlewares/verifyEmail');
const serve = require('../middlewares/serve');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createSubscription } = require('../middlewares/stripe');


const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json('hello api');
});

router.post('/create-subscription',
  auth.requireJWT,
  createSubscription,
);

// Create a new stripe customer
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

router.delete('/digoumananti%C3%B1/:subscriptionId',
  // populate the req.user object
  auth.requireJWT,
  // RESTfully delete the subscription
  async (req, res) => {
    try {
      const deletedSubscription = await stripe.subscriptions.del(
        req.params.subscriptionId
      );
      res.json(deletedSubscription);

    } catch (e) {
      console.error(e);
      res.status('402').json({ error: {message: e} })
    }
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
  const email = req.body.email;
  User.findOne({'email': email}, (err, user) => {
    res.json({'email': email, 'ezel': !!user})
  })
});

router.post('/goulenn_ger-kuzh',
  verifyEmail.exists,
  verifyEmail.sendCodePW,
  (req, res) => {
    res.status(200).end();
  }
)

router.post('/ger-kuzh_nevez',
  verifyEmail.cheñchGerKuzh
)

router.post('/gwiriekaat',
  auth.requireJWT,
  verifyEmail.verify
);

router.post('/gwiriekaat_ar_ger-kuzh',
  verifyEmail.poblañ,
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

router.post('/klask-endro', async (req, res) => {
  // Set the default payment method on the customer

  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  } catch (error) {
    // in case card_decline error
    return res
      .status('402')
      .send({ error: { message: error.message } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent'],
  });
  res.send(invoice);
});

router.delete('/kont', auth.requireJWT, auth.dilemelKont);

router.get('/lenn/:id',
  serve.digeriñ,
  serve.klozañ,
  serve.lenn);

router.get('/prices/:productId', async function(req, res, next) {
  const { productId } = req.params;
  const prices = await stripe.prices.list({
    product: productId,
  });
  res.status(200).json({ prices });
});

router.get('/read/:id',
  serve.digeriñ,
  serve.read);

router.get('/selaou/:id',
  serve.digeriñ,/*
  serve.klozañ,*/
  serve.selaou);

router.post('/subscribe', async (req, res) => {
  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  try {
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customerId,
      items: [
        {
          price: req.body.priceId
        }
      ],
      expand: ['latest_invoice.payment_intent'],
      // TODO : set billing anchor to the end of the month
    });

    res.json(subscription);
  } catch (e) {
    res.status('402').json({
      error: {
      message: `Ur gudenn zo c'hoarvezet er sever en ur gaskl krouiñ ar c'houmanant! ${e}`
    }})
  }
});

module.exports = router;
