import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.incrementGoal = this.incrementGoal.bind(this);
  }

  incrementGoal() {
    this.props.incrementGoal(this.props.id, this.props.count + 1);
  }

  convertTime(minutes) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);
    if (minutes < 10) minutes = `0${minutes}`;
    return `${hours}:${minutes}`;
  }

  convertFrequency(num) {
    var decimalValue = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    var romanNumeral = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
    var numCopy = num;
    var romanized = '';
    while (numCopy > 0) {
      for (var index = 0; index < decimalValue.length; index++) {
        if (+decimalValue[index] <= numCopy && +decimalValue[+index + 1] > numCopy) {
          romanized += romanNumeral[index];
          numCopy -= decimalValue[index];
        }
      }
    }
    return romanized;    
  }

  timeTicker() {
    let className = (this.props.count === 0) ? 'hollow' : 'solid';

    return <span className={className}>{this.convertTime(this.props.goal)}</span>
  }

  frequencyTicker() {
    let result, num, className;

    if (this.props.count === 0) {
      num = this.props.goal;
      className = 'hollow';
    } else {
      num = this.props.count;
      className = 'solid';
    }
    return <span className={className}>{this.convertFrequency(num)}</span>;
  }

  renderTicker() {
    let result = '';
    let count = this.props.count, type = this.props.type, goal = this.props.goal;

    return (this.props.type === 'time') ? this.timeTicker() : this.frequencyTicker();
  }

  renderCount() {
    let goal = (this.props.type === 'time') ? '1' : goal;
    return `${this.props.count} / ${goal}`;
  }

  render() {
    return(
      <li className="task">
        <label className="task-label" htmlFor="">{this.props.name}</label>
        <button className="task-btn" onClick={this.incrementGoal}>
          {this.renderTicker()}
        </button>
        <span className="count">{this.renderCount()}</span>
        <div className="incrementBtns">
          <button className="decrementBtn">-</button>
          <button className="incrementBtn">+</button>
        </div>
      </li>
    )
  }
}

export default Task;