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

// let today = new Date();
// let msInDay = (24 * 60 * 60 * 1000);
// let nextDay = new Date(today.getTime() + msInDay);
// nextDay.setHours(0,0,0,0);
// let nextWeek = new Date(today.getTime() + 7 * msInDay);
// nextWeek.setHours(0,0,0,0);
// let nextMonth;
// if (today.getMonth() === 11) {
//   nextMonth = new Date(today.getFullYear() + 1, 0, 1);
// } else {
//   nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
// }

let today = new Date();
let nextWeek = new Date(today.getTime() + 60000); 
let nextMonth = new Date(today.getTime() + (60000 * 2)); 


// setInterval(function() {
    var job = new CronJob('30 * * * * 1-5', function() {
        console.log("Cron Job!");
        let emailText = '';
        /*
        * Runs every weekday (Monday through Friday)
        * at 11:30:00 AM. It does not run on Saturday
        * or Sunday.
        */
        today = new Date();
        let nextDay = new Date(today.getTime() + 60000); 
        

        const assess = (goalObj, interval) => {
            let goal = goalObj.goal;
            let taskName = goalObj.taskName;
            let taskStreak = goalObj.taskStreak;

            if (goal.count < goal.goal) {
                taskStreak = 0;
                emailText += `You did not complete your ${interval} ${taskName} goal (${goal.count} of ${goal.goal})<br/>`;                
            } else {
                taskStreak += 1;
                emailText += `You completed your ${interval} ${taskName} goal (${goal.count} of ${goal.goal})<br/>`;                
            }

            setValuesAfterAssessment(goal, interval);        
        };

        const compareDates = (date1, date2) => {
            return (date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes());
        };

        const setValuesAfterAssessment = (goal, interval) => {
            let next = (interval === 'daily') ? nextDay : (interval === 'weekly') ? nextWeek : nextMonth;
            goal.assessed = { last: today, next };
            goal.count = 0;
        };

        const getGoalObjs = (tasks, interval) => {
            return tasks.map(task => {
                if (task.goals[interval]) return { taskName: task.name, taskStreak: task.streak, goal: task.goals[interval] };
            });
        };

        User.find({}, function(err, users) {
            users.forEach(function(user) {

                if (compareDates(today, nextMonth)) {
                    let monthlyGoals = getGoalObjs(user.tasks, 'monthly');
                    emailText += `<b>Monthly:</b><br/><br/>`;                    
                    monthlyGoals.forEach(goalObj => {
                        assess(goalObj, 'montly');
                    });                 
                    nextMonth = new Date(today.getTime() + (60000 * 3)); 
                }

                if (compareDates(today, nextWeek)) {
                    let weeklyGoals = getGoalObjs(user.tasks, 'weekly');
                    emailText += `<b>Weekly:</b><br/><br/>`;                    
                    weeklyGoals.forEach(goalObj => {
                        assess(goalObj, 'weekly');
                    });
                    nextWeek = new Date(today.getTime() + (60000 * 2)); 
                }

                let dailyGoals = getGoalObjs(user.tasks, 'daily');
                emailText += `<b>Daily:</b><br/><br/>`;                    
                dailyGoals.forEach(goalObj => {
                    assess(goalObj, 'daily');
                });

                // user.tasks.forEach(task => {
                //     let goals = task.goals;

                //     goals.monthly.assessed.next = 15;
                //     goals.weekly.assessed.next = 10;
                //     goals.daily.assessed.next = 5;

                //     emailText += `Monthly:<br/>`;            
                //     if (goals.monthly && goals.monthly.assessed.next === today) {
                //         assess(task, 'monthly');
                //         emailText += `<br/>`;                        
                //         goals.montly.count = 0;            
                //         goals.weekly.count = 0;            
                //     } else if (goals.weekly && goals.weekly.assessed.next === today) {
                //         emailText += `Weekly:<br/>`;                        
                //         assess(task, 'weekly');
                //         emailText += `<br/>`;                        
                //         goals.weekly.count = 0;                
                //     } else {
                //         emailText += `Daily:<br/>`;                      
                //         assess(task, 'daily');
                //     }
                //     goals.daily.count = 0;
                // });
            });

            var mailOptions = {
                from: '"Tracky" <robert.a.schneiderman@gmail.com>', // sender address
                to: 'robert.a.schneiderman@gmail.com', // list of receivers
                subject: 'Tracky', // Subject line
                html: `${emailText}` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            }); 
        });
        }, function () {
            /* This function is executed when the job stops */
        },
        true /* Start the job right now */
    );


    // }, 100000000); 



// Testing 
//     run cron job every 1 minute
//     every 2 minutes should assess weekly
//     every 3 minutes should assess monthly

//     Today should be right now

