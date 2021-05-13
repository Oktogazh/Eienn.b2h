const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('hello stal');
});

module.exports = router;
