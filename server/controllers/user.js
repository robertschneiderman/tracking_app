const User = require('../models/user');

exports.find = function(req, res, next) {

  User.findById(req.params.id).then(user => {
    // console.log("user:", user);
    User.findById(user.buddy).then(buddy => {
      // console.log("buddy:", buddy);
      if (buddy) {
        res.send({
          user: {id: user._id, email: user.email, name: user.name, buddy: { email: buddy.email, name: buddy.name}},
        });
      } else {
        res.send({
          user: {id: user._id, email: user.email, name: user.name},
        });        
      }
    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });
};