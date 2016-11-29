const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// const { mongoose } = require('./db/mongoose');
const router = require('./router');

const app = express();

const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    mongoose.connect('mongodb://localhost:auth/auth');
} else {
    mongoose.connect('mongodb://heroku_n7jrnqkc:kap0kk3fkirnou5hs767t7h5sv@ds115088-a0.mlab.com:15088,ds115088-a1.mlab.com:15088/heroku_n7jrnqkc?replicaSet=rs-ds115088');
}


// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
// app.use(express.static('../static'));
router(app);

// Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);