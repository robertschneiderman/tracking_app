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
      description: '',
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
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    console.log("this.state:", this.state);
    this.props.createTask(this.state);
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

  handleGoalChange(evt) {
    console.log("evt:", evt);
    if (evt.target.getAttribute('data-enabled') === 'enabled') {
      debugger;
      let daily, weekly, monthly;
      if (evt.target.name === 'daily') {
        daily = ++this.state[this.state.goalType].daily;
        weekly = Math.floor(daily * 7 * .8);
        monthly = Math.floor(weekly * 4.42);
      } else if (evt.target.name === 'weekly') {
        weekly = ++this.state[this.state.goalType].weekly;
        monthly = Math.floor(weekly * 4.42);
        daily = Math.floor(this.state[this.state.goalType].weekly * 1.25 / 7);           
      } else {
        monthly = ++this.state[this.state.goalType].monthly;
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
  }

  renderGoals() {
    let values = this.state[this.state.goalType];
    values = (values) ? values : this.state.time;
    debugger;
    if (this.state.goalInterval === 'daily') {
      return (
        <div>
        <Goal onChange={this.handleGoalChange} name="Daily" enabled={'enabled'} type={this.state.goalType} value={values.daily} />
        <Goal onChange={this.handleGoalChange} name="Weekly" enabled={'disabled'} type={this.state.goalType} value={values.weekly} />
        <Goal onChange={this.handleGoalChange} name="Monthly" enabled={'disabled'} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    } else if (this.state.goalInterval === 'weekly') {
      return (
        <div>
        <Goal onChange={this.handleGoalChange} name="Weekly" enabled={'enabled'} type={this.state.goalType} value={values.weekly} />
        <Goal onChange={this.handleGoalChange} name="Monthly" enabled={'disabled'} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    } else {
      return (
        <div>      
        <Goal onChange={this.handleGoalChange} name="Monthly" enabled={'enabled'} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    }
  }

  createTask() {
    let obj;
    if (this.state.goalInterval === 'daily') {
      obj = this.state[this.state.goalType];
    } else if (this.state.goalInterval === 'weekly') {
      obj['weekly'] = this.state[this.state.goalType].weekly;
    }
    obj['monthly'] = this.state[this.state.goalType].monthly;

    let taskInfo = {
      name: this.state.name,
      description: this.state.description,
      goals: obj,
      goalType: this.state.goalType,
      goalInterval: this.state.goalInterval,      
    };
    this.props.createTask(taskInfo);
  }

  render() {
    let goalsStyle = (this.state.goalType && this.state.goalInterval) ? {'display': 'block'} : {'display': 'none'};
    return(
      <div>
        <div className="task-details">
          <h2>Task</h2>
          <form onSubmit={this.submitForm.bind(this)} className="">
            <input
              value={this.state.name}
              onChange={this.updateValue.bind(this)}
              name="name"
              className="input"
              type="text"
              placeholder="Name" />
            <input
              value={this.state.description}
              onChange={this.updateValue.bind(this)}
              name="description"
              className="input"
              type="text"
              placeholder="Description" />
            <input type="submit"/>
          </form>
        </div>
        
        <div className="goal-area">
          <div className="goal-options">
            <h2>Goal</h2>
            <div className="goal-type">
              <GoalOption name="Time" type="goal-type" onChange={this.handleOptionChange} />
              <GoalOption name="Frequency" type="goal-type" onChange={this.handleOptionChange} />
              <GoalOption name="Truthy" type="goal-type" onChange={this.handleOptionChange} />
            </div>
          
            <div className="goal-interval">
              <GoalOption name="Daily" type="goal-interval" onChange={this.handleOptionChange} />
              <GoalOption name="Weekly" type="goal-interval" onChange={this.handleOptionChange} />
              <GoalOption name="Monthly" type="goal-interval" onChange={this.handleOptionChange} />
            </div>        
          </div>
        
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