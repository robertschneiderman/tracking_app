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
    // this.props.requestUser();
    this.props.requestHistories(0);
  }

  renderPersons() {
    if (!this.props.user.buddy) {
      return [
          <Person 
            user={this.props.user}
            tasks={this.props.userTasks}
            incrementGoal={this.props.incrementGoal}
            date={this.props.date}
            index={this.props.index} />
      ];
    } else {
      return [
          <Person
            user={this.props.user}
            tasks={this.props.userTasks}
            incrementGoal={this.props.incrementGoal}
            index={this.props.index} />,
          <Person
            user={this.props.buddy}
            tasks={this.props.buddyTasks}
            incrementGoal={this.props.incrementGoal}
            index={this.props.index} />
      ];
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
  userTasks: state.history.userHistories[state.history.index].tasks,
  buddy: state.user.currentUser.buddy,
  buddyTasks: state.history.buddyHistories[state.history.index].tasks,
  index: state.history.index
};};

  // requestTasks: () => dispatch(taskActions.requestTasks()),
const mapDispatchToProps = dispatch => ({
  requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
  clearHistories: userId => dispatch(historyActions.clearHistories(userId)),
  incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

const persons = connect(mapStateToProps, mapDispatchToProps)(Persons);

persons.defaultProps = {
  userTasks: [],
  buddyTasks: []
};

export default persons;