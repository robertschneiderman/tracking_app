const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Task = require('./controllers/task');
const Goal = require('./controllers/goal');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

<<<<<<< HEAD
// const indexPath = path.join(__dirname, '../index.html');


  // app.get('/', function(req, res) {
  //   res.sendFile(indexPath);
  // });
module.exports = function(app) {


=======
module.exports = function(app) {

>>>>>>> 9c1bb7a793edd46c2dc79cdac4c7c7de3b6c7d24
  app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);

  app.get('/users/:id', User.find);

  app.post('/tasks', requireAuth, Task.newTask);
  app.get('/tasks', Task.getTasks);

  app.patch('/goals/:id', Goal.update);
};