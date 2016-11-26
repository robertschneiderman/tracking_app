import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/dashboard/index';
import Task from './task';
// import Container from './/_container';

class Person extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTasks();
  }

  renderTasks() {
    return this.props.tasks.map(task => {
      console.log("task:", task);
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

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(actions.getTasks()),
  incrementGoal: (taskId, count) => dispatch(actions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);