const auth = require('./auth');
const User = require('../models/User');
const path = require('path');
const { MongoClient } = require('mongodb');
const fs = require('fs');

function digeriñ(req, res, next) {
  // Extract the information about the lessons requested
  // from param kentel/:id above
  const { id } = req.params;
  const reg = /(^\d+)(@\S+$)/g;
  const klot = reg.exec(id);
  // Populate req.doc with a string reprsenting the number of the fetched lesson
  req.doc = klot[1];
  req.chapter = Number(klot[1]);
  // Populate req.coll with a string reprsenting the method collection
  req.coll = klot[2];
  req.seriesId = klot[2];

  // About the 7 limit here: need to change to series.freeTrial,
  // fetched from courses.index.findOne({ _id: req.seriesId }) mongodb collection
  // when its collection will have been created.
  req.freeTrial = 7;

  if (req.get('Authorization') || (req.action === 'read' && Number(req.chapter) > req.freeTrial)) {
    // in order to register the advencement of registered people
    // (including new subscriber)
    auth.requireJWT(req, res, next);
  } else {
    return next();
  }
}

async function lenn(req, res, next) {
  const payment_failed = req.user? req.user.payment_failed  : false;
  const subscriptionActive = req.user? req.user.subscriptionActive: false;

  // if a req.user were populated,
  // whether or not (user.subscriptionActive === true)
  // register the advencement of user
  if (req.user) {
    const user = await User.findOne({_id: `${req.user.id}`});
    const nivLive = user.live? /(^\d+)(@\S+$)/g.exec(user.live)[1] : user.learning.file;
    const niv = Number(nivLive);
    const nivReq = Number(req.doc);

    // Do not record advencement if user jumped more than one lesson backwards
    // (eg. following a link to revisions)
    if (!(Number(niv-1) > nivReq) && (nivReq > 1)) {
      user.live = `${nivReq-1}${/(^\d+)(@\S+$)/g.exec(req.params.id)[2]}`;
      await user.save();
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
    (kentel === null)?
      res.status(404).end() :
      res.status('200').json({
        kentel,
        payment_failed,
        subscriptionActive
      });
  } catch (e) {
    console.error(e);
  }
}

function authorize(req) {
  if (Number(req.chapter) <= req.freeTrial) return true;

  const { subscriptions } = req.user;
  const { seriesId, chapter } = req;
  const prodId = `prod_${seriesId.substring('@'.length)}`;
  function filter(subObj) {
    const { productId, status } = subObj;
    if (productId === prodId && (status === 'active' || status === 'past_due')) return true;
    return false;
  }

  const filtered = subscriptions.filter(filter);
  return (filtered.length > 0);
}

function updateProgress(oldUserProgress, newProgressObject) {
  const {seriesId, chapter } = newProgressObject;
  const hasStarted = (oldUserProgress.findIndex((e) => e.seriesId === seriesId) !== -1);
  const updateArray = (oldProgObj) => {
    if (oldProgObj.seriesId === seriesId) {
      // Do not record advencement if user jumped more than one lesson backwards
      // (eg. following a link to revisions)
      const updatedChapter = (chapter + 1 >= (oldProgObj.chapter)) ? chapter : oldProgObj.chapter;

      return { seriesId, chapter: updatedChapter }
    }; // Add Selected here
    return oldProgObj;
  };
  if (hasStarted) return oldUserProgress.map(updateArray);
  else return [newProgressObject, ...oldUserProgress];
}

async function read(req, res, next) {
  const authorized = authorize(req) || (req.user.subscriptionActive === true);
  if (!authorized) res.status(401).json({ error: 'Unauthorized'});

  // if a req.user were populated,
  // independently from (authorized)
  // register the advencement of user
  if (req.user) {
    const user = await User.findOne({ _id: `${req.user.id}` });
    const oldUserProgress = user.progress;
    const { seriesId, chapter } = req;
    const newProgressObject = { seriesId, chapter };

    const newProgress = updateProgress(oldUserProgress, newProgressObject);
    user.progress = newProgress;
    user.save();
  }

  try {
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = client.db('courses');
    const chapter = await db.collection(`${req.seriesId}`).findOne({_id: `${req.chapter}`});
    client.close();
    (chapter === null) ?
      res.status(404).end() :
      res.status('200').json({
        chapter,
      });
  } catch (e) {
    console.error(e);
  }
}

async function selaou(req, res, next) {
  const hent = path.join(__dirname, `/../staliad/${req.coll}/${req.doc}.wav`);
  console.log(hent);
  if (fs.existsSync(hent)) {
    res.sendFile(hent, err => {
      if (err) {
        console.error(err);
      }
    })
  } else {
    res.status(404).end();
  }
}

function klozañ(req, res, next) {
  if (7 < Number(req.doc)) {
    try {
      (req.user.subscriptionActive)? null: req.doc = '7';
      next();
    } catch (e) {
      req.doc = '7';
      next();
    }
  } else {
    return next();
  }
}

module.exports = {
  digeriñ,
  klozañ,
  lenn,
  read,
  selaou,
}
