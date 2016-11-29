const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// const { mongoose } = require('./db/mongoose');
const router = require('./router');
const app = express();
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, '/../static/')));

const indexPath = path.join(__dirname, '/../index.html');

app.get('/', function(req, res) {
res.sendFile(indexPath);
});


// DB Setup
mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    mongoose.connect('mongodb://localhost:auth/auth');
} else {
    mongoose.connect('mongodb://heroku_59ldxkrj:15snblhm54fe90hnog8k3dql77@ds113668.mlab.com:13668/heroku_59ldxkrj');
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