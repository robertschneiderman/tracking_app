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
      return <Task name={task.name} increment={} />
    })
  }

  render() {
    return(
      <div className="person">
        <h2>Rob</h2>
        <p>{this.renderTasks()}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(actions.getTasks()),
  increment: () => dispatch(action.increment(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);