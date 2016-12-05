import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/index';
import Task from './task';
import _ from 'lodash';
import TaskPopup from './task_popup';
import $ from 'jquery';

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

  // applyMultiplier(goals) {
  //   for (let key in goals) {
  //       let goal = goals[key];
  //       if (!goal.assessed.last) {
  //       goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
  //       }
  //   }
  //   return goals;
  // }  

  applyMultiplier(goals) {
    let goalsCopy = _.merge({}, goals);
    let noMultiplies = true;
    for (let key in goalsCopy) {
        let goal = goalsCopy[key];
        if (!goal.assessed.last) {
          noMultiplies = false;
          goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
        }
    }
    return (noMultiplies) ? false : goalsCopy;
  }  

  revealPopup(evt) {
    console.log($(evt.target).parent().parent().find('.task-popup').css('display', 'block'));
  }

  hidePopup(evt) {
    console.log($(evt.target).parent().parent().find('.task-popup').css('display', 'none'));
  }  

  renderTasks(tasksByInterval) {
    return tasksByInterval.map(task => {
      let temp = this.applyMultiplier(task.goals);
      return (
        <div className="task-container">
            <Task
              reveal={this.revealPopup.bind(this)}
              hide={this.hidePopup.bind(this)}
              key={task._id}
              task={task}
              goals={temp}
              count={task.goals.daily.count}
              incrementGoal={this.props.incrementGoal} />
            <TaskPopup 
              ref="popup"
              name={task.name}
              goals={task.goals}
              reduced={this.applyMultiplier(task.goals)} />
        </div>
      );

    });
  }

  render() {
    return(
      <div className="person">
        <h2 className="person-title">{this.props.user.email}</h2>
        {this.renderTaskGroup()}
      </div>
    );
  }
}

export default Person;