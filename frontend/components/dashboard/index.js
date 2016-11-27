import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/';

import Person from './person';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestTasks();
  }

  render() {
    return (
      <div className="dashboard">
        <Person tasks={this.props.user} incrementGoal={this.props.incrementGoal} />
        <Person tasks={this.props.buddy} incrementGoal={this.props.incrementGoal} />
      </div> 
    )
  }
}

const mapStateToProps = state => ({
  user: state.tasks.user,
  buddy: state.tasks.buddy
});

const mapDispatchToProps = dispatch => ({
  requestTasks: () => dispatch(actions.requestTasks()),
  incrementGoal: (taskId, count) => dispatch(actions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default connect(null, actions)(Dashboard);