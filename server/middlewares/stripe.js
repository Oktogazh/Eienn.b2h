const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { MongoClient } = require('mongodb');

function updateSubscriptions(usersSubs, newSub, productId) {
  const subscriptionDataToStore = {
    id: newSub.id,
    current_period_start: newSub.current_period_start,
    current_period_end: newSub.current_period_end,
    productId,
    status: newSub.status,
  };
  const withoutOldSubAttempts = usersSubs.filter(function(sub, index, arr) {
      // for security reasons, doesn't delete a sub with the same id if active...
      return ((sub.productId !== productId) || ((sub.status === 'active') && (newSub.id !== sub.id)));
  });

  withoutOldSubAttempts.unshift(subscriptionDataToStore);

  return withoutOldSubAttempts;
};

async function createSubscription(req, res, next) {
  const { customerId } = req.body;
  const { priceId } = req.body;

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const newSub = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    const user = await User.findOne({ customerId });
    const usersSubs = user.subscriptions;
    const productId = newSub.plan.product;
    const newUsersSubscriptions = await updateSubscriptions(usersSubs, newSub, productId);

    user.subscriptions = newUsersSubscriptions;
    user.save();

    res.send({
      subscriptionId: newSub.id,
      clientSecret: newSub.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

module.exports = {
  createSubscription,
  updateSubscriptions,
}
