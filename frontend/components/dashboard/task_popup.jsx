// Name
// Goals 
    // Assessed last, next, whether mult is applied
    // Streak
    // Record
  

import React from 'react';

class TaskPopup extends React.Component {

  constructor(props) {
    super(props);
  }
  
  applyMultiplier() {
    for (let key in this.props.goals) {
        let goal = this.props.goals[key];
        if (!goal.assessed.last) {
        goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
        }
    }
    return this.props.goals;
  }

  renderGoals(goals) {
    let goalComponents = [];
    for (let key in goals) {
        let goal = goals[key];
        goalComponents.push(
            <li className="task-popup-goal">
                <span className="task-popup-goal-interval">{key}</span>
                <span className="task-popup-goal-count">{goal.count}</span>
                <span className="task-popup-goal-bracket">/</span>
                <span className="task-popup-goal-goal">{goal.goal}</span>
                <span className="task-popup-goal-assessed">Next Assessed: </span>
                <span className="task-popup-goal-assessed">{goal.assessed.next}</span>
            </li>
        );
    }
    return goalComponents;
  }

  render() {
    return(
      <div className="task-popup">
        <h3 className="task-popup-name">{this.props.name}</h3>
        <ul className="task-popup-goals">
            {this.renderGoals(this.props.goals)}
        </ul>     
      </div>
    );
        // <TaskPopup 
        //   description={this.props.description}
        //   count={this.props.count}
        //   goals={this.props.goals} />
  }
}

export default TaskPopup;      