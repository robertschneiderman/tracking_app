import React from 'react';
// import Container from './/_container';

class GoalOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'incomplete',
      interval: 'incomplete'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    let property = (evt.target.name === 'goal-type') ? 'type' : 'interval';
    this.setState({[property]: 'complete'});
    if (this.state.type && this.state.interval) {
      this.props.updateGoalOptions;
    }
  }

  render() {
    return(
      <div className="">
        <h2>Goal</h2>
        <div className="goal-type">
          <div className="">
            <label htmlFor="">Time</label>
            <input onChange={this.handleChange} className="ibm" name="goal-type" type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Frequency</label>
            <input onChange={this.handleChange} className="ibm" name="goal-type" type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Truthy</label>
            <input onChange={this.handleChange} className="ibm" name="goal-type" type="radio"/>
          </div>
        </div>

        <div className="goal-interval">
          <div className="">
            <label htmlFor="">Daily</label>
            <input onChange={this.handleChange} className="ibm" name="goal-interval" type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Weekly</label>
            <input onChange={this.handleChange} className="ibm" name="goal-interval" type="radio"/>
          </div>
          <div className="">
            <label htmlFor="">Monthly</label>
            <input onChange={this.handleChange} className="ibm" name="goal-interval" type="radio"/>
          </div>
        </div>        
      </div>
    )
  }
}

export default GoalOptions;