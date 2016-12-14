const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user), user: {id: req.user.id, email: req.user.email} });
};

exports.signup = function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: "You must provide email and password" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'} );
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      
      res.json({ token: tokenForUser(user), user: req.user });
    });
      
  });
};