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
        if (!goal.lastAssessed) {
        goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
        }
    }
    return this.props.goals;
  }

  formattedDate(dateString) {
      let timestamp = Date.parse(dateString);
      let month = new Date(timestamp).getMonth();
      let date = new Date(timestamp).getDate();
      return `${month+1 % 12} / ${date}`;
  }

  renderGoals(goals) {
    let goalComponents = [];
    for (let key in goals) {
        let goal = goals[key];
        let reduced = (!goal.lastAssessed) ? <span className="task-popup-goal-reduced">{Math.ceil(goal.goal * goal.originalMultiplier)}</span> : <span></span>;
        goalComponents.push(
            <li className="task-popup-goal">
                <span className="task-popup-goal-interval">{key}</span>
                <span className="task-popup-goal-completion">
                    <span className="task-popup-goal-count">{goal.count}</span>
                    <span className="task-popup-goal-bracket">/</span>
                    {reduced}
                    <span className="task-popup-goal-goal">{goal.goal}</span>
                </span>
                <span className="task-popup-goal-assessed">
                    <span>Next Assessed: </span>
                    <span>{this.formattedDate(goal.nextAssessed)}</span>
                </span>
            </li>
        );
    }
    return goalComponents;
  }

  render() {
    return(
      <div className="task-popup">
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