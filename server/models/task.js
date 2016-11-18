const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  name: { type: String, unique: true },
  description: String,
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal'}]
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;

