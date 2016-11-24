import React from 'react';
import TaskDetails from './task_details';
import GoalArea from './goal_area';
import Goals from './goals';
// import Container from './/_container';

class NewTask extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="new-task">
        <TaskDetails />
        <GoalArea />
      </div>
    )
  }
}

export default NewTask;