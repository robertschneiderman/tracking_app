import React, {Component} from 'react';
import * as actions from '../actions';

class TaskTime extends Component {
    constructor(props) {
        super(props);
        this.state = {time: 0, active: false};
        this.toggleTimer = this.toggleTimer.bind(this);
    }

    convertTime(minutes) {
        let hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
        if (minutes < 10) minutes = `0${minutes}`;
        return `${hours}:${minutes}`;
    }

    renderTimeTicker() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];

        let className = (count === 0) ? 'hollow' : 'solid';
        let value = (count < goal) ? this.convertTime(this.props.task.timeUnit) : '√';

        return (
            <button className="task-btn" onClick={this.props.incrementGoal.bind(this, 1)}>
                <span className={className}>{value}</span>
            </button>
        );
    }

    toggleTimer() {
        let interval;
        if (!this.state.active) {
            this.state.time = this.props.count;
            interval = setInterval(() => {
                this.setState({
                    time: (this.state.time + 1),
                    active: true
                });
            }, 1000);
        } else {
            clearInterval(interval);
            this.setState({active: false});
            this.props.incrementGoal(this.props.task._id, this.state.time);
        }
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
                <span className="count">{this.state.time}</span>
                {this.renderBtns()}            
            </li>
        );
    }
}

export default TaskTime;