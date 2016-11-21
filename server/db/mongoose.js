const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:auth/auth');

module.exports = { mongoose };