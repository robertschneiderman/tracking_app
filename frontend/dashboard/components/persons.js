import React from 'react';
import { connect } from 'react-redux';
import Person from './person';

class Persons extends React.Component {

  constructor(props) {
    super(props);
  }

  renderPersons() {
    let persons = [this.props.user];
    if (this.props.buddy) persons.push(this.props.buddy);

    return persons.map(user => {
        return(
          <Person 
            key={user.id}          
            user={user}
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