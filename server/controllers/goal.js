const User = require('../models/user');

var _ = require('lodash');

const increment = (goals, incrementObj) => {
  let num = parseInt(incrementObj.increment);
  goals = goals.toObject();
  for (var key in goals) {
    goals[key].count += num;
  }
  return goals;
};

exports.update = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let task = user.tasks.find(task => {
      return task._id == req.params.id;
    });

    let newGoals = (req.body.increment) ? increment(task.goals, req.body) : req.body;
    task.goals = newGoals;

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ task });
    });

  }).catch((e) => {
    res.status(401).send();
  });
};