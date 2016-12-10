import React from 'react';
// import Container from './/_container';

const TaskOption = props => (
  <div className="goal-option">
    <label className="goal-option-label" htmlFor="">{props.name}</label>
    <input
      onChange={props.onChange({btnGroup: props.type, value: props.value})}
      className="ibm" 
      name={props.type} 
      type="radio"
      value={props.name.toLowerCase()}/>
  </div>
);

export default TaskOption;