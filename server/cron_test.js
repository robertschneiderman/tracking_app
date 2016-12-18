var CronJob = require('cron').CronJob;
var CronHelpers = require('./cron_helpers');
var lodash = require('lodash');
// var MailGun = require('./mailgun_helpers');

const User = require('./models/user');

const config = require('./environment');

let todayInteger = new Date().getMinutes();

var duplicateHistory = history => {
    let newTasks = [];
    history.tasks.forEach(task => {
        let newTask = lodash.merge({}, task.toObject());
        let newGoals = [];
        task.goals.forEach(goal => {
            let newGoal = lodash.merge({}, goal.toObject());
            newGoals.push(newGoal);
        });
        newTask.goals = newGoals;
        newTasks.push(newTask);
    });
    return { tasks: newTasks };
};

var job = new CronJob('30 01 05 * * *', function() {
    todayInteger = new Date().getMinutes();

    User.find({}, function(err, users) {
        users.forEach(function(user) { 
            let emailText = '';

            User.findById(user.buddy).then(buddy => {
                let people = (buddy) ? [user, buddy] : [user];
                people.forEach((person, index) => {
                    emailText += `<br/><b>${person.email}</b><br/><br/>`;

                    let duplicated;
                    if (index === 0) {  // ADD COPY OF HISTORY IF USER
                        duplicated = duplicateHistory(person.histories[0]);
                    }
                    let tasks = (duplicated) ? duplicated.tasks : person.histories[0].tasks;

                    if (false) {
                        let monthlyGoals = CronHelpers.getGoalObjs(tasks, 'monthly');
                        emailText += `<br/><b>Monthly:</b><br/><br/>`;                    
                        monthlyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'montly');
                        });                 
                    }

                    if (false) {
                        let weeklyGoals = CronHelpers.getGoalObjs(tasks, 'weekly');
                        emailText += `<br/><b>Weekly:</b><br/><br/>`;                    
                        weeklyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'weekly');
                        });
                    }

                    let dailyGoals = CronHelpers.getGoalObjs(tasks, 'daily');
                    emailText += `<br/><b>Daily:</b><br/><br/>`;                    
                    dailyGoals.forEach(goalObj => {
                        emailText += CronHelpers.assess(goalObj, 'daily');
                    });

                    if (index === 0) {
                        let lastDate = user.histories[0].date;
                        let testingDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1);                        
                        user.histories.unshift({date: testingDate, tasks: tasks});
                    }
                });         
     



                var helper = require('sendgrid').mail;
                
                let fromEmail = new helper.Email("robert.a.schneiderman@gmail.com");
                let toEmail = new helper.Email(`${user.email}`);
                let subject = "Tracky Update";
                let content = new helper.Content("text/html", `${emailText}`);
                let mail = new helper.Mail(fromEmail, subject, toEmail, content);

                var sg = require('sendgrid')(config.sgApiKey);
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });

                sg.API(request, function(error, response) {
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
                });

                // var mailOptions = {
                //     from: '"Tracky" <robert.a.schneiderman@gmail.com>',
                //     to: `${user.email}`,
                //     subject: 'Tracky',
                //     html: `${emailText}`
                // };

                // MailGun.transporter.sendMail(mailOptions, function(error, info){
                //     if(error){
                //         return console.log(error);
                //     }
                //     console.log('Message sent: ' + info.response);
                // });

                user.save(function(err2) {
                    // if (err) { return next(err); }                
                }).catch((e) => {
                    // res.status(401).send();
                });        

            });
            
        });
    });
}, null, true, 'America/Los_Angeles');


