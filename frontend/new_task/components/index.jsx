import React from 'react';

import * as actions from '../actions';
import {connect} from 'react-redux';

import GoalArea from './goal_area';
import TaskArea from './task_area';

class NewTask extends React.Component {

  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
  }

  createTask() {
    let { newTask } = this.props;
    let { name, type, interval } = newTask;
    let goalsObj = newTask[type];
    let goals = [];

    for (let key in goalsObj) {
      let goal = goalsObj[key];
      if (type === 'time') goal *= 60;
      goals.push({count: 0, goal, interval: key});
    }

    if (interval === 'weekly') goals.splice(0, 1);
    if (interval === 'monthly') goals.shift(0, 2);

    this.props.createTask({ name, type, goals, stubs: [] });
  }

  render() {
    return(
      <div className="new-task">
        <TaskArea />
        <GoalArea createTask={this.createTask} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { newTask } = state;
  return {
    newTask
  };
};

const mapDispatchToProps = dispatch => ({
  createTask: taskDetails => dispatch(actions.createTask(taskDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);