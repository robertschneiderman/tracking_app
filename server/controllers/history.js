const User = require('../models/user');

var _ = require('lodash');

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const numberEndings = {
    1: 'st',
    2: 'nd',
    3: 'rd',
};

const formattedDate= date => {
    let month = months[date.getMonth()];
    let day = date.getDate();
    let ending = (day > 3) ? 'th' : numberEndings[day];
    let dayStrFull = `${day.toString()}${ending}`;
    return `${month} ${dayStrFull} ${date.getFullYear()}`;
};

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
        history.date = formattedDate(history.date);
        formattedHistories.push(history);
    });


    res.json({ histories: formattedHistories });

  }).catch((e) => {
    res.status(401).send();
  });
};