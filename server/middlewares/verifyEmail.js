const User = require('../models/User')
const EmailCode = require('../models/EmailCode')
const crypto = require('crypto')


function randomCode() {
  return crypto.randomBytes(36).toString('hex').slice(2, 8).toUpperCase();
}

function sendCode(req, res, next) {
  const code = randomCode()
  const user = req.user
  new EmailCode({
    _userId: user._id,
    code: code,
  })
  // Saving the code in the emailCode collection
  .save(function (err, code) {
    if (err) { return res.status(500).send({ msg: err.message }); }
    res.status(200).json({ code }); // TODO: Send the email
  })
/**
 * //Sending the email
const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
 */
}

function verify(req, res, next) {
  res.status(200).json(req.body.email)
}

module.exports = {
  sendCode,
  verify
}
