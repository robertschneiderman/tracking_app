const User = require('../models').User;
const dh = require('../date_helpers');
var _ = require('lodash');

const increment = (goals, incrementObj) => {
  let num = parseInt(incrementObj.increment);
  goals = goals.toObject();
  goals.forEach(goal => {
    goal.count = num;
  });
  return goals;
};

exports.update = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let task = user.histories[0].tasks.find(task2 => {
      return task2._id == req.params.id;
    });

    let goals = task.goals;
    let newGoals = (req.body.increment) ? increment(task.goals, req.body) : req.body;
    task.goals = newGoals;

    user.save(function(err) {
      if (err) { return next(err); }
      let history = user.histories[0].toObject();
      history.date = dh.formattedDate(user.histories[0].date);    
      res.json(task.goals);
    });


  }).catch((e) => {
    res.status(401).send();
  });
};