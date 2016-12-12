import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';


const convertToTime = (minutes) => {
  let hours = Math.floor(minutes / 60);
  if (hours < 10) hours = `0${hours}`;
  let minutesRemaining = minutes - (hours * 60);
  return `${hours}:${minutesRemaining}`;
};

const Goal = props => {
  let style = (props.enabled) ? { 'display': 'inline-block'} : { 'display': 'none' };
  let formattedValue = (props.type === 'time') ? convertToTime(props.value) : props.value;
  return (
    <div className="goal-wrapper">
      <label className="goal-label ibm">{props.name}</label>
      <input
        onChange={props.changeGoal}
        type="text"
        data-name={props.name}
        value={formattedValue}
        className="goal-input input ibm" />
      <div className="goal-input-btns ibm" style={style}>
        <button
          onClick={props.incrementGoal.bind(null, props.name, props.value + 1)}
          data-enabled={props.enabled}
          data-name={props.name}
          className="goal-input-btn top">^</button>
        <button
          onClick={props.incrementGoal.bind(null, props.name, props.value - 1)}
          data-enabled={props.enabled}
          data-name={props.name}
          className="goal-input-btn bottom">@</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Goal);