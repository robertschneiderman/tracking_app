import React from 'react';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.incrementGoal = this.incrementGoal.bind(this);
  }

  incrementGoal(num) {
    if (num === -1 && this.props.count === 0) return;
    this.props.incrementGoal(this.props.id, this.props.count + num);
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
    let value = (this.props.count < 1) ? this.convertTime(this.props.goal) : '√'

    return <span className={className}>{value}</span>
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

    let value = (this.props.count < this.props.goal) ? this.convertFrequency(num) : '√'    
    return <span className={className}>{value}</span>;
  }

  renderTicker() {
    let result = '';
    let count = this.props.count, type = this.props.type, goal = this.props.goal;

    return (this.props.type === 'time') ? this.timeTicker() : this.frequencyTicker();
  }

  renderCount() {
    let goal = (this.props.type === 'time') ? '1' : this.props.goal;
    return `${this.props.count} / ${goal}`;
  }

  render() {
    return(
      <li className="task">
        <label className="task-label" htmlFor="">{this.props.name}</label>
        <button className="task-btn" onClick={this.incrementGoal.bind(this, 1)}>
          {this.renderTicker()}
        </button>
        <span className="count">{this.renderCount()}</span>
        <div className="increment-btns ibm">
          <button className="increment-btn" onClick={this.incrementGoal.bind(this, -1)}>-</button>
          <button className="increment-btn" onClick={this.incrementGoal.bind(this, 1)}>+</button>
        </div>
      </li>
    )
  }
}

export default Task;