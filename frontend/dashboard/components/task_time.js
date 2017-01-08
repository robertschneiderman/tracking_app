import React, {Component} from 'react';
import * as actions from '../actions';

class TaskTime extends Component {
    constructor(props) {
        super(props);
        this.state = {time: 0, active: false, interval: undefined};

        this.toggleTimer = this.toggleTimer.bind(this);
        this.renderTimeTicker = this.renderTimeTicker.bind(this);
        this.renderCount = this.renderCount.bind(this);
        this.renderBtns = this.renderBtns.bind(this);
    }

    padded(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }

    convertTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);
        let hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
        return `${this.padded(hours)}:${this.padded(minutes)}:${this.padded(seconds)}`;
    }

    abreviateTime(seconds) {
        let timeStr = this.convertTime(seconds);
        return timeStr.slice(0, timeStr.length - 3);
    }

    toggleTimer() {
        // debugger;
        let interval = this.state.interval ? this.state.interval : undefined;
        let {goals} = this.props.task;
        let count = goals[0].count;
        if (!this.state.active) {
            // debugger;
            this.setState({active: true});
            this.state.time = count;
            let that = this;
            interval = setInterval(() => {
                that.setState({
                    time: (that.state.time + 1),
                    interval
                });
            }, 1000);
        } else {
            // debugger;
            console.log('interval: ', interval);
            clearInterval(this.state.interval);
            this.setState({active: false, interval: undefined});
            this.props.incrementGoal(this.props.task._id, this.state.time);
            this.props.createTimestamp(this.props.task._id, this.state.time);
        }
    }    

    renderTimeTicker() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];

        let className = (count === 0) ? 'hollow' : 'solid';
        let value = (count < goal) 
        ? this.state.active ? this.abreviateTime(this.state.time) : this.abreviateTime(count)
        : '√';

        return (
            <button className="task-btn" onClick={this.props.incrementGoal.bind(this, 1)}>
                <span className={className}>{value}</span>
            </button>
        );
    }

    renderCount() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];
        let value = this.state.active ? this.convertTime(this.state.time) : this.abreviateTime(count);
        return(
            <span className="count">
                {`${value} / ${this.abreviateTime(goal)}`}
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