import React from 'react';
import GoalOption from './goal_option';
import Goal from './goal';

class GoalOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.handleChange = this.handleChange.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
  }

  handleChange(evt) {
    let property = (evt.target.name === 'goal-type') ? 'goalType' : 'goalInterval';
    let value = evt.target.value;
    this.setState({[property]: value });
  } 

  renderGoals() {
    let values = this.state[this.state.goalType];
    values = (values) ? values : this.state.time;
    if (this.state.goalInterval === 'daily') {
      return (
        <div>
        <Goal name="Daily" enabled={true} type={this.state.goalType} value={values.daily} />
        <Goal name="Weekly" enabled={false} type={this.state.goalType} value={values.weekly} />
        <Goal name="Monthly" enabled={false} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    } else if (this.state.goalInterval === 'weekly') {
      return (
        <div>
        <Goal name="Weekly" enabled={true} type={this.state.goalType} value={values.weekly} />
        <Goal name="Monthly" enabled={false} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    } else {
      return (
        <div>      
        <Goal name="Monthly" enabled={true} type={this.state.goalType} value={values.monthly} />
        </div>
      )
    }
  }

  render() {
    let goalsStyle = (this.state.goalType && this.state.goalInterval) ? {'display': 'block'} : {'display': 'none'} 
    return(
      <div className="goal-area">
        <div className="goal-options">
          <h2>Goal</h2>
          <div className="goal-type">
            <GoalOption name="Time" type="goal-type" onChange={this.handleChange} />
            <GoalOption name="Frequency" type="goal-type" onChange={this.handleChange} />
            <GoalOption name="Truthy" type="goal-type" onChange={this.handleChange} />
          </div>
        
          <div className="goal-interval">
            <GoalOption name="Daily" type="goal-interval" onChange={this.handleChange} />
            <GoalOption name="Weekly" type="goal-interval" onChange={this.handleChange} />
            <GoalOption name="Monthly" type="goal-interval" onChange={this.handleChange} />
          </div>        
        </div>

        <div className="goals" style={goalsStyle}>
          {this.renderGoals()}
        </div>
      </div>
    )
  }
}

export default GoalOptions;