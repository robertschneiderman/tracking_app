import React from 'react';
import TaskDetails from './task_details';
import GoalOptions from './goal_options';
import Goals from './goals';
// import Container from './/_container';

class NewTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goalOptionsCompleted: false
    }
    this.updateGoalOptions = this.updateGoalOptions.bind(this);
  }

  updateGoalOptions() {
    let goalOptionsCompleted = !this.state.goalOptionsCompleted;
    this.setState({goalOptionsCompleted})
  }

  render() {
    return(
      <div className="new-task">
        <TaskDetails />
        <GoalOptions updateGoalOptions={this.updateGoalOptions} />
        <Goals />
      </div>
    )
  }
}

export default NewTask;