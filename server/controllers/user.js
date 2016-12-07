const User = require('../models/user');

exports.find = function(req, res, next) {
  User.findById(req.params.id).then(user => {
    // console.log("user:", user);
    User.findById(user.buddy).then(buddy => {
      // console.log("buddy:", buddy);
      res.send({
        user: {id: user._id, email: user.email},
        buddy: {id: buddy._id, email: buddy.email}
      });
    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });
};