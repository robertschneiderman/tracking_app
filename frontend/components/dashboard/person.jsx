import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/index';
import Task from './task';
import _ from 'lodash';
// import Container from './/_container';

class Person extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.requestTasks();
  }

  sortTasks() {
    let sortedTasks = {};
    this.props.tasks.forEach(task => {
      let key = task.interval;
      if (sortedTasks[key]) {
        sortedTasks[key].push(task);
      } else {
        sortedTasks[key] = [task];
      }
    });
    return sortedTasks;
  }

  renderTaskGroup() {
    let taskGroups = [];
    let sortedTasks = this.sortTasks();
    for (let key in sortedTasks) {
      let tasksByInterval = sortedTasks[key];
      taskGroups.push(<div className="task-type">
        <h3 className="tasks-subtitle subtitle">{_.startCase(_.toLower(key))}</h3>
        <ul className="tasks">{this.renderTasks(tasksByInterval)}</ul>
      </div>);
    }
    return taskGroups;
  }

  renderTasks(tasksByInterval) {
    return tasksByInterval.map(task => {
      return <Task
              key={task._id}
              task={task}
              goals={task.goals}
              count={task.goals.daily.count}
              incrementGoal={this.props.incrementGoal} />
    });
  }

  render() {
    return(
      <div className="person">
        <h2 className="person-title">{this.props.user.email}</h2>
        {this.renderTaskGroup()}
      </div>
    )
  }
}

export default Person;