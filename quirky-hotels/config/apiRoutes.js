const express = require('express');
const router = express.Router();

const hotelsController = require('../controllers/hotels');
const staticsController = require('../controllers/statics');

router.route('/')
  .get(staticsController.home);

router.route('/hotels')
    .get(hotelsController.index);

//module exports
module.exports = router;
