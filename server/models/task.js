const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  name: { type: String },
  description: String,
  goals: { 
    type: { type: String },
    interval: String,
    daily: Number,
    weekly: Number,
    monthly: Number,
    streak: { type: Number, default: 0 }
  }  
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;

