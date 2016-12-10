import React from 'react';

import {actions} from '../actions/new_task';
import {connect} from 'react-redux';

import Goal from './goal';

class GoalArea extends React.Component {

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

    numericalTime(time) {
        let hours = parseInt(time.slice(0, 2));
        let minutes = parseInt(time.slice(3));

        return (hours * 60 + minutes);
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
        this.props.incrementGoal({daily, weekly, monthly});
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

    renderGoals(state) {
        let type = state.type;
        let interval = state.interval;
        let values = state[state.goalType];
        values = (values) ? values : state.time;

        let intervals = (interval === 'daily') ? ['daily', 'weekly', 'monthly'] : (state.interval === 'weekly') ? ['weekly', 'monthly'] : ['monthly'];

        if (state.type && state.interval) {
            return intervals.map((curInterval, i) => (
                <Goal changeGoal={this.changeGoal} incrementGoal={this.props.incrementGoal} name={curInterval} enabled={(i === 0)} type={state.goalType} value={values[interval]} />
            ));
        }
    }  

    render() {
        return (
            <div className="goal-area">
                <h2 className="title">Goals</h2>        
                <div className="goals">
                {this.renderGoals(this.props.state)}
                </div>
                <button onClick={this.createTask} className="btn btn-primary">Add Task</button>
            </div>
        );  
    }
}

const mapStateToProps = state => ({
    state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalArea);