const Task = require('../models/task');
const User = require('../models/user');

exports.newTask = function(req, res, next) {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let name = req.body.name;
    let description = req.body.description;

    const task = new Task({
      name,
      description,
      user: user._id
    });

    task.save(function(err) {
      if (err) { return next(err); }

      res.json({ task });
    });


  }).catch((e) => {
    res.status(401).send();
  });  


};