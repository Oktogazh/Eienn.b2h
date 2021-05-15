const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('hello api');
});


module.exports = router;
