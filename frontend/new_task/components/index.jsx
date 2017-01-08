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
      goals,
      stubs: []
    };  
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