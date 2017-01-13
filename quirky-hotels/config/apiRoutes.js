const express         = require('express');
const router          = express.Router();

const authentications = require('../controllers/authentications');
const user            = require('../controllers/users');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

router.route('/users')
.get(users.index);

module.exports = router;
