const { db, mongoose } = require('./init');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema



var user = new Schema({
    badges: [String],
    customerId: String,
    email: String,
    learning: {
      folder: {
        type: String,
        default: null
      },
      file: {
        type: {},
        default: null
      }
    },
    live: String,
    passwordHash: String,
    payment_failed: {
      type: Boolean,
      default: false
    },
    priceId: String,
    ResetPassword: String,
    ResetPasswordExpire: Date,
    subscriptionActive: {
      type: Boolean,
      default: false
    },
    subscriptionId: String,
    verified: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {timestamps: true}
);

user.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true, // Ensure that all emails are lowercase
    session: false // Disable session because of JWT auth
});

var User = mongoose.model('User', user)
module.exports = User;
