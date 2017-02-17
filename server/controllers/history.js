const User = require('../models').User;
const dh = require('../date_helpers');
var _ = require('lodash');

exports.get = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    User.findById(user.buddy).then(buddy => {
      let histories = user.histories.slice(req.params.index, parseInt(req.params.index) + 7);
      let userHistories = [];
      histories.forEach(history => {
          history = history.toObject();
          history.date = dh.formattedDate(history.date);
          userHistories.push(history);
      });

      if (buddy) {    
        histories = buddy.histories.slice(req.params.index, parseInt(req.params.index) + 7);
        let buddyHistories = [];
        histories.forEach(history => {
            history = history.toObject();
            history.date = dh.formattedDate(history.date);
            buddyHistories.push(history);
        });
        user.histories = userHistories;
        buddy.histories = buddyHistories;

        res.json({ users: [user, buddy] });        
      } else {
        res.json({ user: [user] });
      }

    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });    
};



exports.create = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    user.histories.push({date: new Date(), tasks: []});

    user.save(function(err) {
      if (err) { return next(err); }
      let history = user.histories[0].toObject();
      history.date = dh.formattedDate(user.histories[0].date);
      res.json(history);
    }).catch((e) => {
      res.status(401).send();
    });    

  }).catch((e) => {
    res.status(401).send();
  });    
};


