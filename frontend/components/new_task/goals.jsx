import React from 'react';
// import Container from './/_container';

class Goals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 'time',
      time: {
        daily: 0,
        weekly: 0,
        monthly: 0
      },
      frequency: {
        daily: 0,
        weekly: 0,
        monthly: 0
      }
    }
  }

  render() {
    return(
      <form className="goals">
        <fieldset className="goals">
          <label>Daily: </label>
          <input type="number"/>
        </fieldset>
        <fieldset className="goals">
          <label>Weekly: </label>
          <input type="number"/>  
        </fieldset>
        <fieldset className="goals">
          <label>Monthly: </label>
          <input type="number"/>  
        </fieldset>
      </form>
    )
  }
}

export default Goals;