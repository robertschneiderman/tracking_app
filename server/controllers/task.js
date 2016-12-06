const User = require('../models/user');

let today = new Date();
let msInDay = (24 * 60 * 60 * 1000);
let tomorrow = new Date(today.getTime() + msInDay);
tomorrow.setHours(0,0,0,0);
let nextWeek = new Date(today.getTime() + 7 * msInDay);
nextWeek.setHours(0,0,0,0);
let nextMonth;
if (today.getMonth() === 11) {
  nextMonth = new Date(today.getFullYear() + 1, 0, 1);
} else {
  nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
}

const days = {
  '0': 1,
  '1': 7,
  '2': 6,
  '3': 5,
  '4': 4,
  '5': 3,
  '6': 2,
};

const fillAssessments = goals => {
  for (let key in goals) {
    goals[key].assessed = {};
    goals[key].assessed.last = null;
    if (key === 'daily') {
      goals[key].assessed.next = tomorrow;        
    } else if (key === 'weekly') {
      goals[key].assessed.next = nextWeek;        
    } else if (key === 'monthly') {
      goals[key].assessed.next = nextMonth;        
    }
  }  
};

const calculateMultipliers = goals => {
  for (let key in goals) {
      let dailyTimeExhaustedPecent = (today.getHours() + (today.getMinutes() / 60)) / 24;
      let dailyTimeLeftPercent = 1 - dailyTimeExhaustedPecent;
    if (key === 'daily') {
      goals[key].originalMultiplier = dailyTimeLeftPercent;
    } else if (key === 'weekly') {
      let daysLeft = days[today.getDay()];
      goals[key].originalMultiplier = (daysLeft - 1 + dailyTimeLeftPercent) / 7;
    } else {
      let daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
      goals[key].originalMultiplier = (daysInMonth - today.getDate() - dailyTimeExhaustedPecent) / daysInMonth;
    }
  }
};

const applyMultipliers = task => {
  for (let key in task.goals) {
    let goal = task.goals[key];
    if (!goal.assessed.last) {
      goal.goal = Math.ceiling(goal.goal * goal.originalMultiplier);
    }
  }
  return task;
};

exports.newTask = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    

    fillAssessments(req.body.goals);
    calculateMultipliers(req.body.goals);

    let task = {
      name: req.body.name,
      type: req.body.type,
      interval: req.body.interval,
      timeUnit: req.body.timeUnit,
      goals: req.body.goals
    };

    user.tasks.push(task);

    user.save(function(err) {
      if (err) { return next(err); }
      
      res.json({ task });
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};

exports.getTasks = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (user.buddy) {
      User.findOne({_id: user.buddy}).then(buddy => {
        res.json({user: user.tasks, buddy: buddy.tasks});
      });
    } else {
      res.json({user: user.tasks });      
    }
  }).catch((e) => {
    res.status(401).send();
  });
};

exports.updateTask = function(req, res, next) {

};