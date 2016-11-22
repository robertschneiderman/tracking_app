import React from 'react';
// import Container from './/_container';

class GoalOptions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="">
        <div className="goal-type">
          <div className="">
            <label htmlFor="">Time</label>
            <input type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Frequency</label>
            <input type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Truthy</label>
            <input type="radio"/>
          </div>
        </div>
      </div>
    )
  }
}

export default GoalOptions;