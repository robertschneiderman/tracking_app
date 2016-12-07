const msInDay = (24 * 60 * 60 * 1000);

exports.getNextDay = (today = new Date()) => {
    let nextDay = new Date(today.getTime() + msInDay);
    nextDay.setHours(0,0,0,0);
    return nextDay;    
};

exports.getNextWeek = (today = new Date()) => {
    let nextWeek = new Date(today.getTime() + 7 * msInDay);
    nextWeek.setHours(0,0,0,0);
    return nextWeek;    
};

exports.getNextMonth = (today = new Date()) => {
    let nextMonth;    
    if (today.getMonth() === 11) {
        return new Date(today.getFullYear() + 1, 0, 1);
    } else {
        return new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }    
};

exports.isTimeOfWeek = (today = new Date()) => {
    today.getDay() === 1;
};

exports.isTimeOfMonth = (today = new Date()) => {
    today.getDate() === 1;
};

exports.compareDates = (date1, date2) => {
    return (date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
};

exports.assess = (goalObj, interval) => {
    let goal = goalObj.goal;
    let task = goalObj.task;
    // let taskName = goalObj.taskName;
    // let taskStreak = goalObj.taskStreak;
    let message;

    if (goal.count < goal.goal) {
        goal.streak = 0;
        message = `<span style="color: red;">Incomplete: ${task.name} (${goal.count} of ${goal.goal})</span><br/>`;                
    } else {
        goal.streak += 1;
        message = `<span style="color: green;">Complete: ${task.name} (${goal.count} of ${goal.goal}) <b>Streak: ${goal.streak}</span><b><br/>`;                
    }
    
    setValuesAfterAssessment(goal, interval);

    return message;
};

const setValuesAfterAssessment = (goal, interval) => {
    let next;
    if (interval === 'daily') {
        next = exports.getNextDay();
    } else if (interval === 'weekly') {
        next = exports.getNextWeek();            
    } else {
        next = exports.getNextMonth();            
    }
    
    goal.assessed = { last: (new Date()), next };
    goal.count = 0;
};

exports.getGoalObjs = (tasks, interval) => {
    return tasks.map(task => {
        for (let i = 0; i < task.goals.length; i++) {
            let goal = task.goals[i];
            if (goal.interval === interval) {
                return { task, goal: goal };
            } else {

            }
        }
    }).filter(task => {
        return (task !== undefined);
    });
};