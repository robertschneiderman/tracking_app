var CronJob = require('cron').CronJob;
var CronHelpers = require('./cron_helpers');
var MailGun = require('./mailgun_helpers');
    // host: 'smtp.gmail.com',

const User = require('./models/user');

let todayInteger = new Date().getMinutes();

var job = new CronJob('50 * * * * *', function() {
    let emailText = '';
    todayInteger = new Date().getMinutes();


    User.find({}, function(err, users) {
        users.forEach(function(user) {       

            if (todayInteger % 4 === 0) {
                let monthlyGoals = CronHelpers.getGoalObjs(user.tasks, 'monthly');
                emailText += `<b>Monthly:</b><br/><br/>`;                    
                monthlyGoals.forEach(goalObj => {
                    emailText += CronHelpers.assess(goalObj, 'montly');
                });                 
            }

            if (todayInteger % 2 === 0) {
                let weeklyGoals = CronHelpers.getGoalObjs(user.tasks, 'weekly');
                emailText += `<b>Weekly:</b><br/><br/>`;                    
                weeklyGoals.forEach(goalObj => {
                    emailText += CronHelpers.assess(goalObj, 'weekly');
                });
            }

            let dailyGoals = CronHelpers.getGoalObjs(user.tasks, 'daily');
            emailText += `<b>Daily:</b><br/><br/>`;                    
            dailyGoals.forEach(goalObj => {
                emailText += CronHelpers.assess(goalObj, 'daily');
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
}, null, true, 'America/Los_Angeles');


