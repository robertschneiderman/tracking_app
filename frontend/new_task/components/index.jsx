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
    let goals = [];
    let daily = this.props.state[this.props.state.type].daily;
    let weekly = this.props.state[this.props.state.type].weekly;
    let monthly = this.props.state[this.props.state.type].monthly;

    if (this.props.state.interval === 'daily') {
      goals = [ { interval: 'daily', count: 0, goal: daily }, { interval: 'weekly', count: 0, goal: weekly }, { interval: 'monthly', count: 0, goal: monthly } ] ;
    } else if (this.props.state.interval === 'weekly') {
      goals = [ { interval: 'weekly', count: 0, goal: weekly }, { interval: 'monthly', count: 0, goal: monthly } ] ;
    } else {
      goals = [ { interval: 'monthly', count: 0, goal: monthly } ] ;
    }

    let taskInfo = {
      name: this.props.state.name,
      type: this.props.state.type,
      shortestInterval: this.props.state.interval,
      goals,
      stubs: []
    };  

    if (this.props.state.type === 'time') { // Make Daily Goal === 1 for time goal
      let timeDefaults = [1, 5, 22];
      taskInfo.timeUnit = daily;
      let j = 2;
      for (let i = taskInfo.goals.length - 1; i >= 0; i--) {
        let goal = taskInfo.goals[i];
        goal.goal = timeDefaults[j];
        j--;
      }
    }    

    this.props.createTask(taskInfo);
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

const mapStateToProps = state => ({
  state: state.newTask
});

const mapDispatchToProps = dispatch => ({
  createTask: taskDetails => dispatch(actions.createTask(taskDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);