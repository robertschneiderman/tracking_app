import React from 'react';
// import Container from './/_container';

const GoalOption = props => (
  <div className="goal-option">
    <label htmlFor="">{props.name}</label>
    <input
      onChange={props.onChange}
      className="ibm" 
      name={props.type} 
      type="radio"
      value={props.name.toLowerCase()}/>
  </div>
)

export default GoalOption;