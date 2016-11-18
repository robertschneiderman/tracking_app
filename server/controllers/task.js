const Task = require('../models/task');

const newTask = function(req, res, next) {
  let name = req.body.name;
  let description = req.body.description;
  // let goals = req.body.goals;  
}