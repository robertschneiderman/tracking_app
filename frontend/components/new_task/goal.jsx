import React from 'react';

const goal = props => {
  // let value = (props.type === 'time') ? `${props.value} minutes` : props.value;
  return (
    <div className="goal-wrapper">
      <label className="goal-label ibm">{props.name}</label>
      <input
        onChange={props.changeGoal}
        type="text"
        data-name={props.name.toLowerCase()}
        value={props.value}
        className="goal-input input ibm" />
      <div className="goal-input-btns ibm">
        <button
          onClick={props.changeGoal}
          data-enabled={props.enabled}
          data-name={props.name.toLowerCase()}
          data-increment="1"
          className="goal-input-btn top">^</button>
        <button
          onClick={props.changeGoal}
          data-enabled={props.enabled}
          data-name={props.name.toLowerCase()}
          data-increment="-1"
          className="goal-input-btn bottom">@</button>
      </div>
    </div>
  )
};

export default goal;