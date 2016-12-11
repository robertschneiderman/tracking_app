var CronJob = require('cron').CronJob;
var CronHelpers = require('./cron_helpers');
var MailGun = require('./mailgun_helpers');

const User = require('./models/user');

let todayInteger = new Date().getMinutes();

var job = new CronJob('22 * * * * *', function() {
    todayInteger = new Date().getMinutes();


    User.find({}, function(err, users) {
        users.forEach(function(user) { 
            let emailText = '';

            User.findById(user.buddy).then(buddy => {
                let people = (buddy) ? [user, buddy] : [user];
                people.forEach(person => {
                    emailText += `<br/><b>${person.email}</b><br/><br/>`;
                    if (todayInteger % 4 === 0) {
                        let monthlyGoals = CronHelpers.getGoalObjs(person.tasks, 'monthly');
                        emailText += `<br/><b>Monthly:</b><br/><br/>`;                    
                        monthlyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'montly');
                        });                 
                    }

                    if (todayInteger % 2 === 0) {
                        let weeklyGoals = CronHelpers.getGoalObjs(person.tasks, 'weekly');
                        emailText += `<br/><b>Weekly:</b><br/><br/>`;                    
                        weeklyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'weekly');
                        });
                    }

                    let dailyGoals = CronHelpers.getGoalObjs(person.tasks, 'daily');
                    emailText += `<br/><b>Daily:</b><br/><br/>`;                    
                    dailyGoals.forEach(goalObj => {
                        emailText += CronHelpers.assess(goalObj, 'daily');
                    });
                });                

                var mailOptions = {
                    from: '"Tracky" <robert.a.schneiderman@gmail.com>',
                    to: `${user.email}`,
                    subject: 'Tracky',
                    html: `${emailText}`
                };

                MailGun.transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });

                user.save(function(err2) {
                    // if (err) { return next(err); }                
                }).catch((e) => {
                    // res.status(401).send();
                });        

            });
            
        });
    });
}, null, true, 'America/Los_Angeles');


