import React from 'react';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.incrementGoal = this.incrementGoal.bind(this);
  }

  componentWillMount(nextProps) {
    debugger;
    this.task = this.props.task;
    this.id = this.task._id;
    this.name = this.task.name;
    this.goals = this.task.goals;
    this.type = this.goals.type;
    this.count = this.goals[this.goals.interval].count;
    this.goal = this.goals[this.goals.interval].goal;
  }

  incrementGoal(num) {
    if (num === -1 && this.count === 0) return;
    this.props.incrementGoal(this.id, this.count + num);
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
    let className = (this.count === 0) ? 'hollow' : 'solid';
    let value = (this.count < 1) ? this.convertTime(this.goal) : '√'

    return <span className={className}>{value}</span>
  }

  frequencyTicker() {
    let result, num, className;

    if (this.count === 0) {
      num = this.goal;
      className = 'hollow';
    } else {
      num = this.count;
      className = 'solid';
    }

    let value = (this.count < this.goal) ? this.convertFrequency(num) : '√'    
    return <span className={className}>{value}</span>;
  }

  renderTicker() {
    let result = '';
    let count = this.count, type = this.type, goal = this.goal;

    return (this.type === 'time') ? this.timeTicker() : this.frequencyTicker();
  }

  renderCount() {
    let goal = (this.type === 'time') ? '1' : this.goal;
    return `${this.count} / ${goal}`;
  }

  render() {
    return(
      <li className="task">
        <label className="task-label" htmlFor="">{this.name}</label>
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
        // <TaskPopup 
        //   description={this.props.description}
        //   count={this.props.count}
        //   goals={this.props.goals} />
  }
}

export default Task;