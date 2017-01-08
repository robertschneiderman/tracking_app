import React, {Component} from 'react';
import * as actions from '../actions';

class TaskTime extends Component {
    constructor(props) {
        super(props);
        this.state = {time: 0, active: false};
        this.toggleTimer = this.toggleTimer.bind(this);
        this.renderTimeTicker = this.renderTimeTicker.bind(this);
        this.renderCount = this.renderCount.bind(this);
        this.renderBtns = this.renderBtns.bind(this);
    }

    convertTime(seconds) {
        let minutes = (seconds / 60);
        let hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
        if (minutes < 10) minutes = `0${minutes}`;
        return `${hours}:${minutes}`;
    }

    toggleTimer() {
        let interval;
        let {goals} = this.props.task;
        let count = goals[0].count;
        if (!this.state.active) {
            this.state.time = count;
            let that = this;
            interval = setInterval(() => {
                that.setState({
                    time: (that.state.time + 1),
                    active: true
                });
            }, 1000);
        } else {
            clearInterval(interval);
            this.setState({active: false});
            this.props.incrementGoal(this.props.task._id, this.state.time);
        }
    }    

    renderTimeTicker() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];

        let className = (count === 0) ? 'hollow' : 'solid';
        let value = (count < goal) ? this.convertTime(count) : '√';

        return (
            <button className="task-btn" onClick={this.props.incrementGoal.bind(this, 1)}>
                <span className={className}>{value}</span>
            </button>
        );
    }

    renderCount() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];
        let antecedent = this.state.active ? this.state.time : count;
        return(
            <span className="count">
                {`${this.convertTime(antecedent)} / ${this.convertTime(goal)}`}
            </span>    
        );
    }    

    renderBtns() {
        let result = [];
        if (this.props.btnsEnabled) {
            result.push(
                <div className="increment-btns ibm">
                    <button className="increment-btn" onClick={this.toggleTimer}>-</button>
                    <button className="increment-btn" onClick={this.toggleTimer}>+</button>
                </div>
            ); 
        }
        return result;
    }    

    render() {
        return(
            <li className="task">
                <label onMouseEnter={this.props.reveal} onMouseLeave={this.props.hide} className="task-label" htmlFor="">{this.props.task.name}</label>       
                {this.renderTimeTicker()}
                {this.renderCount()}
                {this.renderBtns()}            
            </li>
        );
    }
}

export default TaskTime;