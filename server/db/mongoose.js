const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    mongoose.connect('mongodb://localhost:auth/auth');
} else {
    mongoose.connect('mongodb://heroku_59ldxkrj:15snblhm54fe90hnog8k3dql77@ds113668.mlab.com:13668/heroku_59ldxkrj');
}

module.exports = { mongoose };