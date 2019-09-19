const express = require('express');
const router = express.Router();
const { BACKGROUND_COLOR } = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  const bcolor = BACKGROUND_COLOR;

  res.render('index', {
    title: 'Express',
    bcolor: bcolor
  });
});

module.exports = router;
