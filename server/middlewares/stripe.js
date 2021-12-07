const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { MongoClient } = require('mongodb');

async function createSubscription(req, res, next) {
  const { customerId } = req.body;
  const { priceId } = req.body;

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    const user = await User.findOne({ customerId });
    const { subscriptions } = user;
    newSubscription = {
      id: subscription.id,
      current_period_end: subscription.current_period_end,
      current_period_start: subscription.current_period_start,
    }
    subscriptions.unshift(newSubscription);

    user.subscriptions = subscriptions;
    user.save();

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

module.exports = {
  createSubscription,
}
