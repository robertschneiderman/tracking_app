import React from 'react';
import { connect } from 'react-redux';
import Person from './person';

class Persons extends React.Component {

  constructor(props) {
    super(props);
  }

  renderPersons() {
    let persons = [
        <Person 
          key={this.props.user.id}          
          user={this.props.user}
          tasks={this.props.userTasks}
          incrementGoal={this.props.incrementGoal}
          date={this.props.date}
          index={this.props.index} />
    ];

    if (this.props.user.buddy) {
      persons.push(
          <Person
            key={this.props.buddy.id}                    
            user={this.props.buddy}
            tasks={this.props.buddyTasks}
            incrementGoal={this.props.incrementGoal}
            index={this.props.index} />
      );
    }
    return persons;
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