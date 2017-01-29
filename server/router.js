const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Historyy = require('./controllers/history');
const Task = require('./controllers/task');
const Goal = require('./controllers/goal');
const Timestamp = require('./controllers/timestamp');
const passportService = require('./services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({hi: 'there'});
  });

  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/users/:id', User.find);

  app.post('/histories', requireAuth, Historyy.create);

  app.post('/tasks', requireAuth, Task.newTask);
  app.get('/tasks', Task.getTasks);

  app.patch('/goals/:id', Goal.update);

  app.post('/timestamps', requireAuth, Timestamp.create);
  app.patch('/timestamp', requireAuth, Timestamp.edit);
  app.patch('/tasks/:taskId/timestamps/:id', requireAuth, Timestamp.editTemp);
  app.delete('/tasks/:taskId/timestamps/:id', requireAuth, Timestamp.delete);
};