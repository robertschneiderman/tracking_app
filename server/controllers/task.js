const Task = require('../models/task');
const User = require('../models/user');

exports.newTask = function(req, res, next) {
  // var token = req.header('x-auth');
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODMzNGQwMmE0YWFhOWU1YTdkMThjZjciLCJpYXQiOjE0Nzk4NDMzOTIxNjF9.2R9Qhd91GPNG9E_3Uwm1DO3M8YDK72LRQSdsxtcKVpk';

  User.findByToken(token).then((user) => {

    if (!user) {
      return Promise.reject();
    }

    let name = req.body.name;
    let description = req.body.description;

    console.log("name:", name);
    console.log("description:", description);
    console.log("user:", user);

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