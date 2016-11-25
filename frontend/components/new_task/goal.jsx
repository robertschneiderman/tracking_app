import React from 'react';

const goal = props => {
  // let value = (props.type === 'time') ? `${props.value} minutes` : props.value;
  return (
    <div className="goal-wrapper">
      <label className="goal-label">{props.name}</label>
      <input onChange={props.onChange} data-enabled={props.enabled} type="number" name={props.name.toLowerCase()} value={props.value} />
    </div>
  )
};

export default goal;