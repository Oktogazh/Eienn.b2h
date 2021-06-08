const auth = require('./auth');
const User = require('../models/User');

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
    // if req.header Authorization
    auth.requireJWT(req, res, next);
    // if user.sub
    // else access refused
  } else if (doc > 0) {
    digor(req, res, next);
  } else {
    deroù(req, res, next);
  }
}

// This is not Python, it bette to declare your functions
// down the calling function
function digor(req, res, next) {
  // TODO: record progress if (req.user)
  return res.end('lesson content')
}

function deroù(req, res, next) {
  res.end('to do')
}

module.exports = {
  kentel,
  digor
}
