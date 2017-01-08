const User = require('../models/user');

exports.create = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    let { start, end, taskId } = req.body;
    let task = user.tasks.find(task._id === taskId);

    task.timestamps.push({start, end});

    user.save(function(err) {
      if (err) { return next(err); }
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};