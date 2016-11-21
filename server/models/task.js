const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  name: { type: String },
  description: String,
  user: { type: Number, ref: 'User' }  
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;

