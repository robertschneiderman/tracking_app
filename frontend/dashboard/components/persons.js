import React from 'react';
import { connect } from 'react-redux';
import Person from './person';
import Selector from '../../selectors/objToArray';

class Persons extends React.Component {

  constructor(props) {
    super(props);
    this.getTasks = this.getTasks.bind(this);
  }

  getTasks(user) {

    let histories = user.histories.map(historyId => {
      return this.props.histories[historyId];
    });

    // debugger;
    return histories[0].tasks.map(taskId => {
      return this.props.tasks[taskId];
    });
  }

  renderPersons() {
    let persons = this.props.users;
    if (this.props.buddy) persons.push(this.props.buddy);

    return persons.map(user => {
        // let tasks = this.getTasks(user);
        // debugger;

        return(
          <Person 
            key={user.id}          
            user={user}
            tasks={this.props.tasks}
            goals={this.props.goals}
            createTimestamp={this.props.createTimestamp}
            finishTimestamp={this.props.finishTimestamp}
            incrementGoal={this.props.incrementGoal}
            date={this.props.date}
            index={this.props.index} />
        );
    });
  }

  render() {
    return (
      <div className="persons">
        {this.renderPersons()}
      </div> 
    );
  }
}

// persons.defaultProps = {
//   userTasks: [],
//   buddyTasks: []
// };

export default Persons;