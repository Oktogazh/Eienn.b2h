const User = require('../models/User');
const EmailCode = require('../models/EmailCode');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const async = require('async');

async function cheñchGerKuzh(req, res, next) {
  const code = req.body.kod;
  try {
    const userId = await EmailCode.findOne({code})
      .then(doc => {
        return doc._userId
      })
      .catch(err => { return next(err) });

      const user = await User.findOne({_id: userId});

      await user.setPassword(req.body.gerKuzh)
      await user.save();
      res.status(200).end();
  } catch (e) {
    return next(e);
  }
}

async function exists(req, res, next) {
  const postel = req.body.email;
  try {
    const user = await User.findOne({email: postel})
    if (user) {
      req.user = user;
      return next(); // sendCodePW
    } else throw 'ENOEMAIL'
  } catch (e) {
    res.status(404).json({error: {message: e}});
  }
}

async function poblañ(req, res, next) {
  // Poblañ a ra req.user nes JWT
  const email = req.body.email;
  const user = await User.findOne({email: email});
  req.user = user;
  return next(); // verify
}

function randomCode() {
  return crypto.randomBytes(36).toString('hex').slice(2, 8).toUpperCase();
}

function sendCode(req, res, next) {
  async.waterfall([
    function(done) { // Generate the code
      const code = randomCode()
      return done(null, code);
    },
    function(code, done) {
      // Create the code document
      const user = req.user
      new EmailCode({
        _userId: user._id,
        code: code
      })
      // Saving the code in the emailCode collection
      .save(function (err, code) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        done(err, user.email, code.code)
      })
    },
    function(email, code, done) {
      const mailOptions = {
        from: process.env.EMAIL_CODE_ADDRESS,
        to: email,
        subject: 'Code de vérification',
        text: 'Voici votre code de validation :\n' +
        code +
        '\nVous pouvez rentrer ce code dans la fenêtre qui s\'est ouverte lors de la création de ce mail, ou bien vous pouvez cliquer sur le lien suivant et compléter l\'opération :\n'+
        'https://eienn.bzh/#/gwiriekaat'
      }
      // Sends the email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_CODE_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      .sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        done(next());
      })
    }
  ]);
}

async function sendCodePW(req, res, next) {
  async.waterfall([
    function(done) { // Generate the code
      const code = randomCode()
      return done(null, code);
    },
    function(code, done) {
      // Create the code document
      const user = req.user
      new EmailCode({
        _userId: user._id,
        code: code
      })
      // Saving the code in the emailCode collection
      .save(function (err, code) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        done(err, user.email, code.code)
      })
    },
    function(email, code, done) {
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Réinisialisation du mot de passe',
        text: 'Voici votre code :\n' +
        code +
        "\nLe seul moyen d'utiliser ce code est de le rentrer dans la fenêtre "+
        "qui s'est ouverte lorsque vous avez lancé votre demande de réinitialisation."
      }
      // Sends the email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      .sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        done(next());
      })
    }
  ]);
}

function randomLongCode() {
  return crypto.randomBytes(2**5).toString('hex');
}

async function sendConxnLink(req, res, next) {
  async.waterfall([
    function(done) { // Generate the code
      const code = randomLongCode()
      return done(null, code);
    },
    function(code, done) {
      // Create the code document
      const { email } = req.body;
      new EmailCode({
        email: email,
        code: code,
      })
      // Saving the code in the emailCode collection
      .save(function (err, code) {
        if (err) return res.status(500).send({ msg: err.message });
        done(err, email, code.code)
      })
    },
    function(email, code, done) {
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Réinisialisation du mot de passe',
        text: 'Cliquez sur ce lien pour pouvoir réinitialiser votre mot de passe :\n' +
        `${process.env.APP_URI}#?newpsw=${code}&address=${email}`
      }
      // Sends the email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      .sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        else return res.status(200).end();
      })
    }
  ]);
}

async function sendVerifLink(req, res, next) {
  async.waterfall([
    function(done) { // Generate the code
      const code = randomLongCode();
      return done(null, code);
    },
    async function(code, done) {
      const email = req.body.address;
      const user = await User.findOne({ email });
      // Create the code document
      user.verificationCode = code;

      // Saving the code in the emailCode collection
      user.save(function (err, user) {
        if (err) return res.status(500).send({ msg: err.message });
        done(err, email, user.verificationCode)
      })
    },
    function(email, code, done) {
      console.log({ code });
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Vérification de votre adresse mail',
        text: 'Cliquez sur ce lien pour vérifier votre adresse mail :\n' +
        `${process.env.APP_URI}#?verifCode=${code}&address=${email}`
      }
      // Sends the email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
      .sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        else return res.status(200).end();
      })
    }
  ]);
}

function verify(req, res, next) {
  const code = req.body.kod;
  const user = req.user;

  EmailCode.findOne({code})
    .then(doc => {
      if (doc._userId.equals(user._id)) {
        User.findById(user._id)
          .then((user) => {
            user.verified = true
            user.save();
            return user
          })
          .then((user) => {
            res.status(200).json(user.verified)
          })
          .catch(err => { res.status(401) });
        } else {
          res.status(401);
        }
    })
    .catch( (err) => { res.sendStatus(401); });
}

async function checkingCode(req, res, next) {
  try {
    const { address, code } = req.body;
    req.user = await User.findOne({ email: address, verificationCode: code });
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json(e);
  }
}

module.exports = {
  checkingCode,
  cheñchGerKuzh,
  exists,
  poblañ,
  sendCode,
  sendCodePW,
  sendConxnLink,
  sendVerifLink,
  verify,
}
