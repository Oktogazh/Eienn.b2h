const mongoose = require('./init');
const passportLocalMongoose = require('passport-local-mongoose');


var user = new mongoose.Schema({
    email: String,
    passwordHash: String,
    ResetPassword: String,
    ResetPasswordExpire: Date,
    subscriptionActive: {
      type: Boolean,
      default: false
    },
    customerId: String,
    subscriptionId: String,
    learning: {
      folder: {
        type: String,
        default: null},
      file: {
        type: {},
        default: null}
    },
    badges: [String],
  }, {timestamps: true});

user.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true, // Ensure that all emails are lowercase
    session: false // Disable session because of JWT auth
});

var User = mongoose.model('User', user)
module.exports = User;
