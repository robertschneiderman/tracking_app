const User = require('../models/user');

exports.signup = function(req, res, next) {
  res.send({ success: 'true' });

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password" });
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
      
      res.json({ success: true });
    });
      
  })
};