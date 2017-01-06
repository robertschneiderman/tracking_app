import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../task/actions';
import Task from '../task/components/task';
import _ from 'lodash';
import TaskPopup from '../task/components/task_popup';
import $ from 'jquery';

// import Container from './/_container';

class Person extends React.Component {

  constructor(props) {
    super(props);
    this.renderTasks = this.renderTasks.bind(this);
  }

  componentWillMount() {
    // this.props.requestTasks();
  }

  sortTasks() {
    let { tasks } = this.props.user.histories[this.props.index];
    let sortedTasks = {};
    tasks.forEach(task => {
      let key = task.shortestInterval;
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
  //       if (!goal.lastAssessed) {
  //       goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
  //       }
  //   }
  //   return goals;
  // }  

  applyMultiplier(goals) {
    let goalsCopy = _.merge({}, goals);
    for (let key in goalsCopy) {
        let goal = goalsCopy[key];
        if (!goal.lastAssessed) {
          goal.goal = Math.ceil(goal.goal * goal.originalMultiplier);
        }
    }
    return goalsCopy;
  }  

  revealPopup(evt) {
    console.log($(evt.target).parent().parent().find('.task-popup').css('display', 'block'));
  }

  hidePopup(evt) {
    console.log($(evt.target).parent().parent().find('.task-popup').css('display', 'none'));
  }  

  renderTasks(tasksByInterval) {
    return tasksByInterval.map(task => {
      let goals = task.goals;
      // let goals = this.applyMultiplier(task.goals);
    // debugger;      
      debugger;
      let intervals = ["daily", "weekly", "monthly"];
      let quickestInterval = intervals[3 - Object.keys(task.goals).length];
      return (
        <div className="task-container">
            <Task
              reveal={this.revealPopup.bind(this)}
              hide={this.hidePopup.bind(this)}
              key={task._id}
              task={task}
              type={task.type}
              goal={goals[0]}
              count={goals[0].count}
              incrementGoal={this.props.incrementGoal}
              btnsEnabled={this.props.index === 0} />
            <TaskPopup 
              ref="popup"
              name={task.name}
              key={`${task._id}-p`}              
              goals={task.goals}
              reduced={this.applyMultiplier(task.goals)} />
        </div>
      );

    });
  }

  render() {
    return(
      <div className="person">
        <h2 className="person-title">{this.props.user.name}</h2>
        {this.renderTaskGroup()}
      </div>
    );
  }
}

export default Person;