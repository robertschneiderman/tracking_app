import React from 'react';
import TaskDetails from './task_details';
import GoalOptions from './goal_options';
import Goal from './goal';
// import Container from './/_container';

class NewTask extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="new-task">
        <TaskDetails />
        <GoalOptions />
        <Goal />
      </div>
    )
  }
}

export default NewTask;