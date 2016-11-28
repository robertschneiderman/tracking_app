const Task = require('../models/task');
const Goal = require('../models/task');
const User = require('../models/user');

var _ = require('lodash');

const increment = (goals, incrementObj) => {
  console.log("incrementObj:", incrementObj);
  num = parseInt(incrementObj.increment);

  if (goals.interval === 'daily') {
    goals.daily.count += num;
    goals.weekly.count += num;
  } else if (goals.interval === 'weekly') {
    goals.weekly.count += num;
  }
    goals.monthly.count += num;
    return goals;
}

exports.update = function(req, res, next) {
  console.log("UPDATE?!?!?!?");
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let task = user.tasks.find(task => {
      return task._id == req.params.id
    });

    console.log("req.body:", req.body);

    let newGoals = (Number.IsNumber(req.body.increment)) ? increment(task.goals, req.body) : req.body;

    let goal = _.merge({}, task.goals, newGoals);
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