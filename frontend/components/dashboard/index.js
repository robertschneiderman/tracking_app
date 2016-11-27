import React from 'react';
import { connect } from 'react-redux';
import * as taskActions from '../../actions/task/';
import * as userActions from '../../actions/user/';

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
        <Person user={this.props.user} tasks={this.props.userTasks} incrementGoal={this.props.incrementGoal} />
        <Person user={this.props.buddy} tasks={this.props.buddyTasks} incrementGoal={this.props.incrementGoal} />
      </div> 
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.current,
  buddy: state.user.buddy,
  userTasks: state.tasks.user,
  buddyTasks: state.tasks.buddy
});

const mapDispatchToProps = dispatch => ({
  requestUser: userId => dispatch(userActions.requestUser(userId)),
  requestTasks: () => dispatch(taskActions.requestTasks()),
  incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default connect(null, actions)(Dashboard);