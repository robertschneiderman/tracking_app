const User = require('../models/user');
const Task = require('../models/task');

var _ = require('lodash');

const increment = (goals, incrementObj) => {
  let num = parseInt(incrementObj.increment);
  goals = goals.toObject();
  for (var key in goals) {
    console.log("num", num);
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

    console.log("req.body:", req.body);    

    let newGoals = (req.body.increment) ? increment(task.goals, req.body) : req.body;

    console.log("newGoals:", newGoals);    

    task.goals = newGoals;

    console.log("task.goals", task.goals);

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ task });
    });

  }).catch((e) => {
    res.status(401).send();
  });
};