import React from 'react';

const convertToTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  if (hours < 10) hours = `0${hours}`;
  let minutesRemaining = minutes - (hours * 60);
  // minutesRemaining = 
  return `${hours}:${minutesRemaining}`;
};

const goal = props => {
  // let value = (props.type === 'time') ? `${props.value} minutes` : props.value;
  let style = (props.enabled) ? { 'display': 'inline-block'} : { 'display': 'none' };
  let formattedValue = (props.type === 'time') ? convertToTime(props.value) : props.value;
  return (
    <div className="goal-wrapper">
      <label className="goal-label ibm">{props.name}</label>
      <input
        onChange={props.changeGoal}
        type="text"
        data-name={props.name.toLowerCase()}
        value={formattedValue}
        className="goal-input input ibm" />
      <div className="goal-input-btns ibm" style={style}>
        <button
          onClick={props.incrementGoal}
          data-enabled={props.enabled}
          data-name={props.name.toLowerCase()}
          data-increment="1"
          className="goal-input-btn top">^</button>
        <button
          onClick={props.incrementGoal}
          data-enabled={props.enabled}
          data-name={props.name.toLowerCase()}
          data-increment="-1"
          className="goal-input-btn bottom">@</button>
      </div>
    </div>
  )
};

export default goal;