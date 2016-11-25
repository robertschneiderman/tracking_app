const Task = require('../models/task');
const Goal = require('../models/task');
const User = require('../models/user');

exports.newTask = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {

    if (!user) {
      return Promise.reject();
    }

    let name = req.body.name;
    let description = req.body.description;
    let goals = req.body.goals;

    console.log("goals:", goals);

    const task = new Task({
      name,
      description,
      goals
    });

    task.save(function(err) {
      if (err) { return next(err); }

      user.tasks.push(task._id);

      user.save(function (err) {
        if (err) return handleError(err);
      });

      res.json({ task });
    });


  }).catch((e) => {
    res.status(401).send();
  });  


};