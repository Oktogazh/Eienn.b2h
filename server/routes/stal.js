const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.raw({ type: 'application/json' }));

router.post('/',
  // src: https://stripe.com/docs/billing/subscriptions/fixed-price
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Set subscriptionAtive = true
        // Set subscriptionId = subscription
        // Set PriceId
        try {
          const cus = dataObject.customer;
          var user = await User.findOne({customerId: cus});
          const sub = dataObject.subscription,
          type = dataObject.lines.data[0].price.id;
          subActive = (dataObject.status === 'paid'),
          live = user.learning.file? user.learning.file : '0';

          user.subscriptionActive = subActive;
          user.subscriptionId = sub;
          user.priceId = type;
          user.learning.file = live;
          user.payment_failed = false;
          user.save()
            .then((saved) => {
              return console.log(`User updated: ${saved == user}`)
            })
        } catch (e) {
          console.error(e);
        }
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        // an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        const customerId = dataObject.customer;

        try {
          const user = await User.findOne({customerId});
          user.payment_failed = true
        } catch (e) {
          console.error(e);
        }
        break;
      case 'customer.subscription.deleted':
        const subscription = dataObject,
        id = subscription.id;
        if (event.request != null) {
          try {
            const user = await User.findOne({subscriptionId: id});

            user.subscriptionActive = false;
            user.subscriptionId = null;
            user.save()
              .then((saved) => {
              return console.log(`User updated: ${saved == user}`)
            }) // add an email saying thank you for learning with us
          } catch (e) {
            console.error(e);
          }
        } else {
          try {
            const user = await User.findOne({subscriptionId: id})
            user.subscriptionActive = false;
            user.subscriptionId = null;
            user.save()
              .then((saved) => {
              return console.log(`User updated: ${saved == user}`)
            })
          } catch (e) {
            console.error(e);
          }
        }
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
});


module.exports = router;
