import React from 'react';
import { connect } from 'react-redux';
import * as taskActions from '../task/actions';
import * as userActions from '../user/actions';

import Person from './person';

class Persons extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestTasks(localStorage.getItem('currentUser'));
  }

  renderPersons() {
    if (!this.props.user.buddy) {
      return (
        <div className="persons">       
          <Person user={this.props.user} tasks={this.props.userTasks} incrementGoal={this.props.incrementGoal} />
        </div>
      );
    } else {
      return (
        <div className="persons">        
          <Person user={this.props.user} tasks={this.props.userTasks} incrementGoal={this.props.incrementGoal} />
          <Person user={this.props.buddy} tasks={this.props.buddyTasks} incrementGoal={this.props.incrementGoal} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="persons">
        {this.renderPersons()}
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  userTasks: state.tasks.currentUser,
  buddyTasks: state.tasks.buddy
});

  // requestTasks: () => dispatch(taskActions.requestTasks()),
const mapDispatchToProps = dispatch => ({
  requestTasks: userId => dispatch(taskActions.requestTasks(userId)),
  incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);

// export default connect(null, actions)(Dashboard);