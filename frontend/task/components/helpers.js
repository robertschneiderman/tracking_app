export const applyMultiplier = (goals) => {
    for (let key in goals) {
        let goal = goals[key];
        if (!goal.assessed.last) {
        goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
        }
    }
    return goals;
};  