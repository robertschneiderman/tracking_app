import React from 'react';
import { connect } from 'react-redux';
import * as taskActions from '../task/actions';
import * as userActions from '../user/actions';
import * as historyActions from '../history/actions';

import Person from './person';

class Persons extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestHistories(0);
  }

  renderPersons() {
    if (!this.props.user.buddy) {
      return (
        <div className="persons">       
          <Person 
            user={this.props.user}
            tasks={this.props.userTasks}
            incrementGoal={this.props.incrementGoal}
            date={this.props.date}
            index={this.props.index} />
        </div>
      );
    } else {
      return (
        <div className="persons">        
          <Person
            user={this.props.user}
            tasks={this.props.userTasks}
            incrementGoal={this.props.incrementGoal}
            index={this.props.index} />
          <Person
            user={this.props.buddy}
            tasks={this.props.buddyTasks}
            incrementGoal={this.props.incrementGoal}
            index={this.props.index} />
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

const mapStateToProps = state => {
  return {
  user: state.user.currentUser,
  userTasks: state.history.histories[state.history.index].tasks,
  buddyTasks: state.tasks.buddy,
  index: state.history.index
};};

  // requestTasks: () => dispatch(taskActions.requestTasks()),
const mapDispatchToProps = dispatch => ({
  requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
  clearHistories: userId => dispatch(historyActions.clearHistories(userId)),
  incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);

// export default connect(null, actions)(Dashboard);