import React from 'react';

const goal = props => {
  // let value = (props.type === 'time') ? `${props.value} minutes` : props.value;
  return (
    <div className="goal-wrapper">
      <label className="goal-label">{props.name}</label>
      <input type="number" value={props.value} />
    </div>
  )
};

export default goal;