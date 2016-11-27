import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/index';
import Task from './task';
// import Container from './/_container';

class Person extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.requestTasks();
  }

  renderTasks() {
    return this.props.tasks.map(task => {
      return <Task
              key={task._id}
              id={task._id}
              name={task.name}
              count={task.goals.count}
              goal={task.goals.daily}
              type={task.goals.type}
              interval={task.goals.interval}
              incrementGoal={this.props.incrementGoal} />
    });
  }

  render() {
    return(
      <div className="person">
        <h2 className="person-title">Rob</h2>
        <ul className="tasks">{this.renderTasks()}</ul>
      </div>
    )
  }
}

export default Person;