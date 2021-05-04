const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

const jwtSecret = process.env.JWT_PRIV_KEY
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

/**
 * Middleware from https://github.com/Gurenax/express-mongoose-passport-jwt
 */

passport.use(User.createStrategy())

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


  // Send the token
  res.status(200).json({
    token,
    'email': user.email,
    'sub': user.subscriptionActive
  })
}


module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}
