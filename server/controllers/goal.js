const Task = require('../models/task');
const Goal = require('../models/task');
const User = require('../models/user');

var _ = require('lodash');

exports.update = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let task = user.tasks.find(task => {
      return task._id == req.params.id
    });

    let goal = _.merge({}, task.goals, req.body);
    task.goals = goal;

    user.save(function(err) {
      if (err) { return next(err); }
      console.log("task:", task);
      res.json({ task });
    });

  }).catch((e) => {
    res.status(401).send();
  });
}