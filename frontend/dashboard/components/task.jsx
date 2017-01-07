import React from 'react';
import TaskPopup from './task_popup';
import { isToday } from '../helpers';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.incrementGoal = this.incrementGoal.bind(this);
  }

  componentWillMount(nextProps) {

  }

  incrementGoal(num) {
    if (num === -1 && this.props.goal.count === 0) return;
    this.props.incrementGoal(this.props.task._id, num);
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
    let value = (this.props.count < this.props.goal.goal) ? this.convertTime(this.props.task.timeUnit) : '√';
    // let value = this.convertTime(this.props.task.timeUnit);

    return <span className={className}>{value}</span>;
  }

  frequencyTicker() {
    let result, num, className;

    if (this.props.count === 0) {
      num = this.props.goal.goal;
      className = 'hollow';
    } else {
      num = this.props.count;
      className = 'solid';
    }
    let value = (this.props.count < this.props.goal.goal) ? this.convertFrequency(num) : '√';
    value = (this.props.type === 'time') ? 'I' : value;  
    return <span className={className}>{value}</span>;
  }

  renderTicker() {
    let result = '';
    let count = this.props.count, type = this.type, goal = this.props.goal;
    if (this.props.btnsEnabled) {
      let tickerType= (this.props.type === 'time') ? this.timeTicker() : this.frequencyTicker();
      return <button className="task-btn" onClick={this.incrementGoal.bind(this, 1)}>{tickerType}</button>;
    } else {
      return <div className="ibm"></div>;
    }
  }

  renderCount() {
    let goal = (this.type === 'time') ? '1' : this.props.goal.goal;
    return `${this.props.count} / ${goal}`;
  }

  renderBtns() {
    if (this.props.index === 0) {
      return (
        <div className="increment-btns ibm">
          <button className="increment-btn" onClick={this.incrementGoal.bind(this, -1)}>-</button>
          <button className="increment-btn" onClick={this.incrementGoal.bind(this, 1)}>+</button>
        </div>        
      );
    } else {
      return (      
        <div className="increment-btns ibm"></div>
      );
    }
  }

  render() {
    return(
      <li className="task">
        <label onMouseEnter={this.props.reveal} onMouseLeave={this.props.hide} className="task-label" htmlFor="">{this.props.task.name}</label>       
        {this.renderTicker()}
        <span className="count">{this.renderCount()}</span>
        {this.renderBtns()}
      </li>
    );
        // <TaskPopup 
        //   description={this.props.description}
        //   count={this.props.count}
        //   goals={this.props.goals} />
  }
}

export default Task;