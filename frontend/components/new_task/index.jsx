import React from 'react';

import {actions} from '../actions/new_task';
import {connect} from 'react-redux';

class NewTask extends React.Component {

  constructor(props) {
    super(props);
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

  createTask() {
    let goals = [];
    let daily = this.state[this.state.goalType].daily;
    let weekly = this.state[this.state.goalType].weekly;
    let monthly = this.state[this.state.goalType].monthly;

    if (this.state.goalInterval === 'daily') {
      goals = [ { interval: 'daily', count: 0, goal: daily }, { interval: 'weekly', count: 0, goal: weekly }, { interval: 'monthly', count: 0, goal: monthly } ] ;
    } else if (this.state.goalInterval === 'weekly') {
      goals = [ { interval: 'weekly', count: 0, goal: weekly }, { interval: 'monthly', count: 0, goal: monthly } ] ;
    } else {
      goals = [ { interval: 'monthly', count: 0, goal: monthly } ] ;
    }

    let taskInfo = {
      name: this.state.name,
      type: this.state.goalType,
      shortestInterval: this.state.goalInterval,
      goals,
      stubs: []
    };  

    if (this.state.goalType === 'time') { // Make Daily Goal === 1 for time goal
      let timeDefaults = [1, 5, 22];
      taskInfo.timeUnit = daily;
      let j = 2;
      for (let i = taskInfo.goals.length - 1; i >= 0; i--) {
        let goal = taskInfo.goals[i];
        goal.goal = timeDefaults[j];
        j--;
      }
    }    

    this.props.createTask(taskInfo);
  }

  render() {
    return(
      <div className="new-task">
        <TaskArea />
        <GoalArea />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createTask: taskDetails => dispatch(actions.createTask(taskDetails))
});

export default NewTask;