const auth = require('./auth');
const User = require('../models/User');
const path = require('path');
const { MongoClient } = require('mongodb');

function kentel(req, res, next) {
  // Extract the information about the lessons requested
  // from param kentel/:id above
  const id = req.params.id;
  const reg = /(^\d+)(@\S+$)/g;
  const klot = reg.exec(id);
  // Populate req.doc with a string reprsenting the number of the fetched lesson
  req.doc = klot[1];
  // Populate req.coll with a string reprsenting the method collection
  req.coll = klot[2];

  const doc = Number(req.doc);

  if (doc > 7) {
    // Needed to populate the req.uer
    auth.requireJWT(req, res, next);
  } else if (doc > 0) {
    // in order to register the advencement of registered people
    // (including new subscriber)
    if (req.get('Authorization')) {
      auth.requireJWT(req, res, next);
      // while letting everybody else access the data
    } else {
      return next();
    }
  } else {
    deroù(req, res, next);
  }
}

// This is not Python, it's better to declare your functions
// under the calling function
async function digor(req, res, next) {
  // if a req.user were populated,
  // whether or not (user.subscriptionActive === true)
  // register the advencement of user
  if (req.user) {
    const user = await User.findOne({_id: `${req.user.id}`});
    const live = user.live? /(^\d+)(@\S+$)/g.exec(user.live)[1] : user.learning.file;
    const niv = Number(live);
    // Do not record advencement if user jumped more than one lesson backwards
    // (eg. following a link to revisions)
    if (!(Number(niv)-1 > Number(req.doc))) {
      user.live = req.params.id;
      await user.save()
    }
  }

  try {
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = client.db('kenteliaoueg');
    const kentel = await db.collection(`${req.coll}`).findOne({_id: `${req.doc}`});
    client.close();
    return res.status('200').json(kentel);
  } catch (e) {
    console.error(e)
  }
}

async function selaou(req, res, next) {
  const hent = `/../staliad/${req.coll}/${req.doc}.wav`;

  res.sendFile(path.join(__dirname, hent), err => {
    if (err) {
      console.error(err);
    }
  })
}

async function sub(req, res, next) {
  if (7 < Number(req.doc)) {
    (req.user.subscriptionActive)? next(): res.status('403').end('Diaotreet');
  } else {
    return next();
  }
}

function deroù(req, res, next) {
  res.end('to do')
}

module.exports = {
  kentel,
  digor,
  selaou,
  sub
}
