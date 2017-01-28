const User = require('../models/user');

exports.create = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    let { taskId } = req.body;
    let task = user.histories[0].tasks.find(taskk => {
        return taskk._id == taskId;
    });

    task.timestamps.unshift({start: new Date(), end: undefined});

    user.save(function(err) {
      if (err) { return next(err); }
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};

exports.edit = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    let { taskId } = req.body;
    let task = user.histories[0].tasks.find(taskk => {
        return taskk._id == taskId;
    });

    task.timestamps[0].end = new Date();

    user.save(function(err) {
      if (err) { return next(err); }
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};

exports.editTemp = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    // let { taskId } = req.body;
    let task = user.histories[0].tasks.find(taskk => {
        return taskk._id == req.params.taskId;
    });

    let timestamp = task.timestamps.find(timestamp => timestamp._id == req.params.id);

    // timestamp = timestamp.toObject();
    timestamp.start = req.body.timestamp.start;
    timestamp.end = req.body.timestamp.end;

    user.save(function(err) {
      if (err) { return next(err); }
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};


exports.delete = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    // let { taskId } = req.body;
    let task = user.histories[0].tasks.find(taskk => {
        return taskk._id == req.params.taskId;
    });

    let timestamp = task.timestamps.find(timestamp => timestamp._id == req.params.id);

    // timestamp = timestamp.toObject();
    timestamp.remove();

    user.save(function(err) {
      if (err) { return next(err); }
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};