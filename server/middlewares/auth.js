const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

async function dilemelKont(req, res, next) {
  try {
    const log = await User.deleteOne({ _id: req.user._id });
    res.status(200).end();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Middleware from https://github.com/Gurenax/express-mongoose-passport-jwt
 */
 const jwtSecret = process.env.JWT_PRIV_KEY;
 const jwtAlgorithm = 'HS256';
 const jwtExpiresIn = 30000000;

passport.use(User.createStrategy())

passport.use(
  new PassportJwt.Strategy(
    // Options
    {
      // e.g. Authorization: Bearer xxxxxxxxxx
      jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // What is the secret
      secretOrKey: jwtSecret,
      // What algorithm(s) were used to sign it?
      algorithms: [jwtAlgorithm]
    },
    // When we have a verified token
    (payload, done) => {
      // Find the real user from our database using the `id` in the JWT
      User.findById(payload.sub)
        .then(user => {
          // If user was found with this id
          if (user) {
            done(null, user)
          } else {
            // If not user was found
            done(null, false)
          }
        })
        .catch(error => {
          // If there was failure
          done(error, false)
        })
    }
  )
)

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }
    // Store user so we can access it in our handler
    req.user = user
    // Success!
    next()
  })
}

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // payload
    {
      email: user.email
    },
    // secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )

  // While all the former user.learning API hasn't been replaced
  // Builds the new '@' API
  // TODO: learn how to make this change in the DB directly
  const live = user.live?
    user.live : user.learning.file/*folder*/?
      `${user.learning.file}@br42_fr.1` : '0@br42_fr.1';

  const reg = /(^\d+)(@\S+$)/g;
  const klot = reg.exec(live);
  const level = klot[1];
  const chapter = (level === '0') ? undefined : Number(level);
  const series = (level === '0') ? undefined : process.env.SERIES_ID;
  const progress = [{
    chapter,
    seriesId: series,
  }];

  // Send the token
  res.status(200).json({
    token,
    'customerId': user.customerId || null,
    'email': user.email,
    'live': live,
    progress,
    'sub': user.subscriptionActive,
    'subscriptionId': user.subscriptionId || null,
    'subscriptions': user.subscriptions,
    'verified': user.verified || false
  })
}

async function updateUser(req, res, next) {
  const { email } = req.user;
  const { lastProgress } = req.body;

  const user = await User.findOne({ email });

  res.status(200).json({
    'email': user.email,
    progress : user.progress,
    'subscriptions': user.subscriptions,
  })
}

module.exports = {
  dilemelKont,
  initialize: passport.initialize(),
  register,
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser,
  signIn: passport.authenticate('local', { session: false }),
  updateUser,
}
