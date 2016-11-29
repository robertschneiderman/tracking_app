const Task = require('../models/task');
const User = require('../models/user');

exports.newTask = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    const task = {
      name: req.body.name,
      type: req.body.type,
      interval: req.body.interval,
      goals: req.body.goals
    };

    user.tasks.push(task);

    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ task });
    });

  }).catch((e) => {
    res.status(401).send();
  });
};

exports.getTasks = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    User.findOne({_id: user.buddy}).then(buddy => {
      res.json({user: user.tasks, buddy: buddy.tasks});
    });
  }).catch((e) => {
    res.status(401).send();
  });
};

exports.updateTask = function(req, res, next) {

};