var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');
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

let today = new Date();
let msInDay = (24 * 60 * 60 * 1000);
let nextDay = new Date(today.getTime() + msInDay);
nextDay.setHours(0,0,0,0);
let nextWeek = new Date(today.getTime() + 7 * msInDay);
nextWeek.setHours(0,0,0,0);
let nextMonth;
if (today.getMonth() === 11) {
  nextMonth = new Date(today.getFullYear() + 1, 0, 1);
} else {
  nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
}
let emailText;

today = 0;
nextWeek = 0;
nextMonth = 0;

setInterval(function() {
        // var job = new CronJob('00 * * * * 1-5', function() {
        /*
        * Runs every weekday (Monday through Friday)
        * at 11:30:00 AM. It does not run on Saturday
        * or Sunday.
        */
        today += 5;
        nextWeek += 5;
        nextMonth += 5;

        const assess = (task, interval) => {
            let goals = task.goals;   
            if (goals[interval] && goals[interval].count < goals[interval].goal) {
                task.streak = 0;
                let next = (interval === 'daily') ? nextDay : (interval === 'weekly') ? nextWeek : nextMonth;
                goals[interval].assessed = { last: today, next }; 
            } else {
                task.streak += 1;
            }            
            
            console.log("task.goals: ", task.goals);
            for (let key in task.goals) {
                // let assessed = task.goals[key].assessed;
                // console.log("task.goals[key]: ", task.goals[key]);
            }
        };

        User.find({}, function(err, users) {
            users.forEach(function(user) {

                user.tasks.forEach(task => {
                    let goals = task.goals;

                    goals.monthly.assessed.next = 15;
                    goals.weekly.assessed.next = 10;
                    goals.daily.assessed.next = 5;

                    if (goals.monthly && goals.monthly.assessed.next === today) {
                        assess(task, 'monthly');
                        goals.montly.count = 0;            
                        goals.weekly.count = 0;            
                    } else if (goals.weekly && goals.weekly.assessed.next === today) {
                        assess(task, 'weekly');
                        goals.weekly.count = 0;                
                    } else {
                        assess(task, 'daily');
                    }
                    goals.daily.count = 0;
                });
            });
        });
            console.log("cron job!!!");
    //     }, function () {
    //         /* This function is executed when the job stops */
    //     },
    //     true /* Start the job right now */
    //     );
        today += 5;
    }, 1000);



var mailOptions = {
    from: '"Tracky 👥" <robert.a.schneiderman@gmail.com>', // sender address
    to: 'robert.a.schneiderman@gmail.com', // list of receivers
    subject: 'Tracky', // Subject line
    text: emailText, // plaintext body
    html: '<b>Hello world</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});  



// Testing 
//     run task every 5 seconds
//     every 10 should increment weekly
//     every 15 should increment monthly

//     Today should be right now

