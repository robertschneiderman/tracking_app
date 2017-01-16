const User = require('../models/user');
const dh = require('../date_helpers');

exports.find = function(req, res, next) {

  User.findById(req.params.id).then(user => {
    User.findById(user.buddy).then(buddy => {
      let histories = user.histories.slice(0, parseInt(0) + 7);
      let userHistories = [];
      histories.forEach(history => {
          history = history.toObject();
          history.date = dh.formattedDate(history.date);
          userHistories.push(history);
      });      
      user = user.toObject();
      user.histories = userHistories;

      if (buddy) {
        histories = buddy.histories.slice(0, parseInt(0) + 7);
        let buddyHistories = [];
        histories.forEach(history => {
            history = history.toObject();
            history.date = dh.formattedDate(history.date);
            buddyHistories.push(history);
        });

        buddy = buddy.toObject();
        buddy.histories = buddyHistories;

        res.json({ users: [user, buddy] });        
      } else {
        res.json({ users: [user] });
      }        
    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });
};

  //   res.send({
  //     user: {id: user._id, email: user.email, name: user.name, buddy: { id: buddy._id, email: buddy.email, name: buddy.name}},
  //   });
  // } else {
  //   res.send({
  //     user: {id: user._id, email: user.email, name: user.name},
  //   });        
  // }