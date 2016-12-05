const User = require('./models/user');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;


// const nextDay = () => {}
// const nextWeek = () => {}
// const nextMonth = () => {}

const assess = interval => {   
    if (goals[interval] && goals[interval.count < goals[interval.goal) {
        task.streak = 0;
        goals.assessed = { last: today, next: nextDay(today) }; 
    } else {
        task.streak += 1;
    }
}
})

User.find({}, function(err, users) {
    users.forEach(function(user) {

        user.tasks.forEach(task => {
            let goals = task.goals;

            if (goals.monthly && goals.monthly.assessed.next === today) {
                assess('monthly');
                goals.montly.count = 0;            
                goals.weekly.count = 0;            
            } else if (goals.weekly && goals.weekly.assessed.next === today) {
                assess('weekly');
                goals.weekly.count = 0;                
            } else {
                assess('daily');
            }
            goals.daily.count = 0;                 
        
    })
});


