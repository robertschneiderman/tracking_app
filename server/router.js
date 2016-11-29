const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Task = require('./controllers/task');
const Goal = require('./controllers/goal');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

const indexPath = path.join(__dirname, '/../index.html');


module.exports = function(app) {

  app.get('/', function(req, res) {
    res.sendFile(indexPath);
  });

  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/users/:id', User.find)

  app.post('/tasks', requireAuth, Task.newTask);
  app.get('/tasks', Task.getTasks);

  app.patch('/goals/:id', Goal.update);
};