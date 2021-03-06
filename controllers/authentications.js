
const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

function authenticationsRegister(req, res) {
  console.log('register');
  User.create((req.body.user), (err, user) => {
    if (err) return res.status(500).json({ message: 'Oh no something went wrong'});

    const token = jwt.sign(user._id, config.secret);

    return res.status(201).json({
      message: `Welcome ${user.username}!`,
      user,
      token
    });
  });
}

function authenticationsLogin(req, res) {
  console.log('login');
  User.findOne({ email: req.body.email}, (err, user) => {
    if (err) return res.status(500).json({ message: 'Oh no something went  wrong'});
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'No way! Unauthorized'});
    }

    const token = jwt.sign(user.id, config.secret);

    return res.status(200).json({
      message: 'Welcome Back',
      user,
      token
    });
  });
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
