const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Task = require('./controllers/task');
const Goal = require('./controllers/goal');
const Historyy = require('./controllers/history');
const Timestamp = require('./controllers/timestamp');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/users/:id', User.find);

  app.post('/tasks', requireAuth, Task.newTask);
  app.get('/tasks', Task.getTasks);

  app.patch('/goals/:id', Goal.update);

  app.get('/history/:index', Historyy.get);
  app.post('/history', requireAuth, Historyy.create);

  app.post('/timestamps', requireAuth, Timestamp.create);
  app.patch('/timestamp', requireAuth, Timestamp.edit);

};