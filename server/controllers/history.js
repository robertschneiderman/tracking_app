const User = require('../models/user');
const dh = require('../date_helpers');
var _ = require('lodash');

exports.get = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    let histories = user.histories.slice(req.params.index, req.params.index + 4);
    let formattedHistories = [];
    histories.forEach(history => {
        history = history.toObject();
        history.date = dh.formattedDate(history.date);
        formattedHistories.push(history);
    });


    res.json({ histories: formattedHistories });

  }).catch((e) => {
    res.status(401).send();
  });
};