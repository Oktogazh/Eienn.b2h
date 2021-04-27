const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello api');
});

router.post('/kevrea%C3%B1', (req, res) => {
  var email = req.body.email
  res.json({'email': email});
});

module.exports = router;
