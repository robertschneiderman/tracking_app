const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';

// if (env === 'development') {
    mongoose.connect('mongodb://localhost:auth/auth');
// } else {
    // mongoose.connect('mongodb://heroku_n7jrnqkc:kap0kk3fkirnou5hs767t7h5sv@ds115088-a0.mlab.com:15088,ds115088-a1.mlab.com:15088/heroku_n7jrnqkc?replicaSet=rs-ds115088');
// }

module.exports = { mongoose };