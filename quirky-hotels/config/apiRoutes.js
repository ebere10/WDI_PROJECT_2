const express = require('express');
const router = express.Router();

const hotelsController = require('../controllers/hotels');

router.route('/hotels')
  .get(hotelsController.index);

//module exports
module.exports = router;
