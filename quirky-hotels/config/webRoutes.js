const express = require('express');
const router  = express.Router();

router.route('/')
.get(statics.home);

module.exports = router;
