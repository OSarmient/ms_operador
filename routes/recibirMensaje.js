const express = require('express');
const router = express.Router();
const socketApp = require('../chat/socketapp.js');


/* GET home page. */
router.post('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

module.exports = router;