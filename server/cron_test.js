var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
var CronHelpers = require('./cron_helpers');
    // host: 'smtp.gmail.com',
var smtpConfig = {
    service: 'Mailgun',    
    auth: {
        user: 'postmaster@sandbox28e182c251764d5b96a71536174ca420.mailgun.org',
        pass: '1bef070f9f714e347f36c45c0d5437e0',
        apiKey: 'key-73f4d8a1f95e332bd967b059bbdd4e47',
        domain: 'sandbox28e182c251764d5b96a71536174ca420.mailgun.org'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);
const User = require('./models/user');

let todayInteger = new Date().getMinutes();

// var job = new CronJob('25 * * * * *', function() {
//     let emailText = '';
//     todayInteger = new Date().getMinutes();


//     User.find({}, function(err, users) {
//         users.forEach(function(user) {       

//             if (todayInteger % 4 === 0) {
//                 let monthlyGoals = CronHelpers.getGoalObjs(user.tasks, 'monthly');
//                 emailText += `<b>Monthly:</b><br/><br/>`;                    
//                 monthlyGoals.forEach(goalObj => {
//                     emailText += CronHelpers.assess(goalObj, 'montly');
//                 });                 
//             }

//             if (todayInteger % 2 === 0) {
//                 let weeklyGoals = CronHelpers.getGoalObjs(user.tasks, 'weekly');
//                 emailText += `<b>Weekly:</b><br/><br/>`;                    
//                 weeklyGoals.forEach(goalObj => {
//                     emailText += CronHelpers.assess(goalObj, 'weekly');
//                 });
//             }

//             let dailyGoals = CronHelpers.getGoalObjs(user.tasks, 'daily');
//             emailText += `<b>Daily:</b><br/><br/>`;                    
//             dailyGoals.forEach(goalObj => {
//                 emailText += CronHelpers.assess(goalObj, 'daily');
//             });
            
//             var mailOptions = {
//                 from: '"Tracky" <robert.a.schneiderman@gmail.com>',
//                 to: `${user.email}`,
//                 subject: 'Tracky',
//                 html: `${emailText}`
//             };

//             transporter.sendMail(mailOptions, function(error, info){
//                 if(error){
//                     return console.log(error);
//                 }
//                 console.log('Message sent: ' + info.response);
//             });

//             user.save(function(err2) {
//                 // if (err) { return next(err); }                
//             }).catch((e) => {
//                 // res.status(401).send();
//             });        
//         });


        
//     });
// }, null, true, 'America/Los_Angeles');


