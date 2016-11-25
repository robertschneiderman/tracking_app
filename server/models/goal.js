const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = Schema({
  name: String,
  type: String,
  interval: String,
  streak: Integer,
  daily: Integer,
  weekly: Integer,
  monthly: Integer
});

const goalModel = mongoose.model('goal', goalSchema);

module.exports = goalModel;