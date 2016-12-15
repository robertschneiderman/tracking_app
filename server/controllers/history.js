const User = require('../models/user');
const dh = require('../date_helpers');
var _ = require('lodash');

exports.get = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    User.findById(user.buddy).then(buddy => {
      let histories = user.histories.slice(req.params.index, req.params.index + 4);
      let userHistories = [];
      histories.forEach(history => {
          history = history.toObject();
          history.date = dh.formattedDate(history.date);
          userHistories.push(history);
      });

      if (buddy) {    
        histories = buddy.histories.slice(req.params.index, req.params.index + 4);
        let buddyHistories = [];
        histories.forEach(history => {
            history = history.toObject();
            history.date = dh.formattedDate(history.date);
            buddyHistories.push(history);
        });
        res.json({ userHistories, buddyHistories });        
      } else {
        res.json({ userHistories });
      }

    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });    
};