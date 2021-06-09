const auth = require('./auth');
const User = require('../models/User');
const { MongoClient } = require('mongodb');

function kentel(req, res, next) {
  // Extract the information about the lessons requested
  // from param kentel/:id above
  const id = req.params.id;
  const reg = /(^\d+)(@\S+$)/g;
  const match = reg.exec(id);
  // Populate req.doc with a string reprsenting the number of the fetched lesson
  req.doc = match[1];
  // Populate req.coll with a string reprsenting the method collection
  req.coll = match[2];

  const doc = Number(req.doc);

  if (doc > 7) {
    // Needed to populate the req.uer
    auth.requireJWT(req, res, next);
  } else if (doc > 0) {
    // in order to register the advencement of registered people
    // (including new subscriber)
    // while letting everybody else access the data
    if (req.get('Authorization')) {
      auth.requireJWT(req, res, next);
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
  // if
  if (req.user) {
    // TODO: detect whether or not the user has jumped back in the lessons
    const user = await User.findOne({_id: `${req.user.id}`});
    user.live = req.params.id;

    await user.save()
  }

  try {
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('kenteliaoueg');
    const kentel = await db.collection(`${req.coll}`).findOne({_id: `${req.doc}`});
    client.close();
    return res.status('200').json(kentel);
  } catch (e) {
    console.error(e)
  }
}

async function sub(req, res, next) {
  if (7 < Number(req.doc)) {
    (req.user.subscriptionActive)? next(): res.status('401').end('Unauthorized');
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
  sub
}
