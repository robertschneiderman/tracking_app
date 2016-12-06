import React from 'react';
import GoalOption from './goal_option';
import Goal from './goal';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/';

class GoalOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      goalType: null,
      goalInterval: null,
      time: {
        daily: 15,
        weekly: 84,
        monthly: 371
      },
      frequency: {
        daily: 1,
        weekly: 5,
        monthly: 22
      }     
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.incrementGoal = this.incrementGoal.bind(this);
    this.changeGoal = this.changeGoal.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  updateValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }  

  handleOptionChange(evt) {
    let property = (evt.target.name === 'goal-type') ? 'goalType' : 'goalInterval';
    let value = evt.target.value;
    this.setState({[property]: value });
  }

  syncIntervals(intervalChanged, value) {
    let daily, weekly, monthly;
    if (intervalChanged === 'daily') {
      daily = value;
      weekly = Math.floor(daily * 7 * .8);
      monthly = Math.floor(weekly * 4.42);
    } else if (intervalChanged === 'weekly') {
      weekly = value;
      monthly = Math.floor(weekly * 4.42);
      daily = Math.floor(this.state[this.state.goalType].weekly * 1.25 / 7);           
    } else {
      monthly = value;
      weekly = Math.floor(monthly * .226);
      daily = Math.floor(weekly * 7 * .8);
    }
    this.setState({
      [this.state.goalType]: {
        daily,
        weekly,
        monthly
      }
    });
  }

  incrementGoal(evt) {
    let name = evt.target.getAttribute('data-name');
    let increment = parseInt(evt.target.getAttribute('data-increment'));

    this.syncIntervals(name, this.state[this.state.goalType][name] + increment);
  }

  changeGoal(evt) {
    let cursorPos = evt.target.selectionStart-1;
    let name = evt.target.getAttribute('data-name');
    let value = evt.target.value;
    // let prevValue = evt.target.defaultValue;
    let addedVal = value[cursorPos+1];
    if (value.length === 3 || !Number.isInteger(parseInt(value[cursorPos])) ) {
      return; // break if string goes under 3 is not a number 
    }
    let overwrittenTime = value.slice(0, cursorPos+1) + value.slice(cursorPos+2);
    let numericalTime = this.numericalTime(overwrittenTime);

    this.syncIntervals(name, numericalTime);    

    console.log(value);
  }  

  addedChar(newVal, oldVal) {
    for (let i = 0; i < newVal.length; i++) {
      let char = newVal[i];
      if (!oldVal[i] || char !== oldVal[i]) return char;
    }
  }

  overwriteTime(newVal, addedVal) {
    for (let i = 0; i < newVal.length; i++) {
      let char = newVal[i];
      if (char === addedVal) {
        return newVal.slice(0, i+1) + newVal.slice(i+2);
      }
    }
  }

  // 12:00
  // '2'
  // 12:200

  numericalTime(time) {
    let hours = parseInt(time.slice(0, 2));
    let minutes = parseInt(time.slice(3));

    return (hours * 60 + minutes);
  }

  createTask() {
    debugger;
    let goals = {};
    let daily = this.state[this.state.goalType].daily;
    let weekly = this.state[this.state.goalType].weekly;
    let monthly = this.state[this.state.goalType].monthly;

    if (this.state.goalInterval === 'daily') {
      goals = { daily: { count: 0, goal: daily }, weekly: { count: 0, goal: weekly }, monthly: { count: 0, goal: monthly } } ;
    } else if (this.state.goalInterval === 'weekly') {
      goals = { weekly: { count: 0, goal: weekly }, monthly: { count: 0, goal: monthly } };    
    } else {
      goals = { monthly: { count: 0, goal: monthly } } ;      
    }

    let taskInfo = {
      name: this.state.name,
      type: this.state.goalType,
      interval: this.state.goalInterval,
      goals,
      stubs: []
    };    

    if (this.state.goalType === 'time') { // Make Daily Goal === 1 for time goal
      let timeDefaults = [1, 5, 22];
      taskInfo.timeUnit = daily;
      let i = 0;
      for (let interval in taskInfo.goals) {
        taskInfo.goals[interval].goal = timeDefaults[i];
        i++; 
      }
    }    

    this.props.createTask(taskInfo);
  }
  

  renderGoals() {
    let values = this.state[this.state.goalType];
    values = (values) ? values : this.state.time;
    if (this.state.goalInterval === 'daily') {
      return [
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Daily" enabled={true} type={this.state.goalType} value={values.daily} />,
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Weekly" enabled={false} type={this.state.goalType} value={values.weekly} />,
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Monthly" enabled={false} type={this.state.goalType} value={values.monthly} />
      ];
    } else if (this.state.goalInterval === 'weekly') {
      return [
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Weekly" enabled={true} type={this.state.goalType} value={values.weekly} />,
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Monthly" enabled={false} type={this.state.goalType} value={values.monthly} />
      ];
    } else {
      return (
        <Goal changeGoal={this.changeGoal} incrementGoal={this.incrementGoal} name="Monthly" enabled={true} type={this.state.goalType} value={values.monthly} />
      );
    }
  }

  render() {
    let goalsStyle = (this.state.goalType && this.state.goalInterval) ? {'display': 'block'} : {'display': 'none'};
    return(
      <div>
        <div className="task-area">
          <h2 className="title">Task</h2>
          <div className="task-form">
            <input
              value={this.state.name}
              onChange={this.updateValue.bind(this)}
              name="name"
              className="input task-input"
              type="text"
              placeholder="Name" />
          </div>
          <div className="goal-options">
            <div className="goal-option-group">
              <h3 className="subtitle">Type</h3>
              <GoalOption name="Time" type="goal-type" onChange={this.handleOptionChange} />
              <GoalOption name="Frequency" type="goal-type" onChange={this.handleOptionChange} />
              <GoalOption name="Truthy" type="goal-type" onChange={this.handleOptionChange} />
            </div>
          
            <div className="goal-option-group">
              <h3 className="subtitle">Interval</h3>
              <GoalOption name="Daily" type="goal-interval" onChange={this.handleOptionChange} />
              <GoalOption name="Weekly" type="goal-interval" onChange={this.handleOptionChange} />
              <GoalOption name="Monthly" type="goal-interval" onChange={this.handleOptionChange} />
            </div>        
          </div>          
        </div>
        
        <div className="goal-area">
          <h2 className="title">Goals</h2>        
          <div className="goals" style={goalsStyle}>
            {this.renderGoals()}
          </div>
        
          <button onClick={this.createTask} className="btn btn-primary">Add Task</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createTask: taskDetails => dispatch(actions.createTask(taskDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalOptions);