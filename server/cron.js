var CronJob = require('cron').CronJob;
var CronHelpers = require('./cron_helpers');
var MailGun = require('./mailgun_helpers');

const User = require('./models/user');

// var job = new CronJob('10 00 00 * * *', function() {
    let today = new Date();
    
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            let emailText = '';
            User.findById(user.buddy).then(buddy => {
                let people = (buddy) ? [user, buddy] : [user];                
                people.forEach(person => {
                    if (CronHelpers.isTimeOfMonth(today)) {
                        let monthlyGoals = CronHelpers.getGoalObjs(person.tasks, 'monthly');
                        emailText += `<b>Monthly:</b><br/><br/>`;                    
                        monthlyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'montly');
                        });                 
                    }

                    if (CronHelpers.isTimeOfWeek(today)) {
                        let weeklyGoals = CronHelpers.getGoalObjs(person.tasks, 'weekly');
                        emailText += `<b>Weekly:</b><br/><br/>`;                    
                        weeklyGoals.forEach(goalObj => {
                            emailText += CronHelpers.assess(goalObj, 'weekly');
                        });
                    }

                    let dailyGoals = CronHelpers.getGoalObjs(person.tasks, 'daily');
                    emailText += `<b>Daily:</b><br/><br/>`;                    
                    dailyGoals.forEach(goalObj => {
                        emailText += CronHelpers.assess(goalObj, 'daily');
                    });
                });

                var helper = require('sendgrid').mail;
                
                let fromEmail = new helper.Email("robert.a.schneiderman@gmail.com");
                let toEmail = new helper.Email("robert.a.schneiderman@gmail.com");
                let subject = "Tracky Update";
                let content = new helper.Content("text/html", emailText);
                let mail = new helper.Mail(fromEmail, subject, toEmail, content);

                var sg = require('sendgrid')('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');
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
                //     to: `${user.email} ${buddy.email}`,
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
// }, null, true, 'America/Los_Angeles');
