const express         = require('express');
const router          = express.Router();

const authentications = require('../controllers/authentications');
const users            = require('../controllers/users');
const hotels            = require('../controllers/hotels');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

router.route('/users')
.get(users.index);

router.route('/hotels')
.get(hotels.index);

module.exports = router;
