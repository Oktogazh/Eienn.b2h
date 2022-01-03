const { db, mongoose } = require('./init');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema



var user = new Schema({
    badges: [String],
    customerId: {
      type: String,
      default: null,
    },
    email: String,
    learning: {
      folder: {
        type: String,
        default: null
      },
      file: {
        type: String,
        default: null
      }
    },
    live: String,
    passwordHash: String,
    payment_failed: {
      type: Boolean,
      default: false,
    },
    priceId: String,
    progress: {
      type: Array,
      default: [
        {
          chapter: null,
          seriesId: null,
        }
      ],
    },
    ResetPassword: String,
    ResetPasswordExpire: Date,
    subscriptionActive: {
      type: Boolean,
      default: false
    },
    subscriptionId: String,
    subscriptions: {
      type: Array,
      default: [],
    },
    verificationCode: {
      type: String,
      default: null,
      required: false,
    },
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
