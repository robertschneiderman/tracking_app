import React, {Component} from 'react';
import * as actions from '../actions';

class TaskFrequency extends Component {
    constructor(props) {
        super(props);
        this.incrementGoal = this.incrementGoal.bind(this);
        this.renderFrequencyTicker = this.renderFrequencyTicker.bind(this);
        this.renderCount = this.renderCount.bind(this);
        this.renderBtns = this.renderBtns.bind(this);        
    }

    incrementGoal(num) {
        let { goals } = this.props.task;
        let { count } = goals[0];        
        if (num === -1 && count === 0) return;
        this.props.incrementGoal(this.props.task._id, count + num);
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

    renderLabel() {
        return <label onMouseEnter={this.props.reveal} onMouseLeave={this.props.hide} className="task-label" htmlFor="">{this.props.task.name}</label>;
    } 

    renderFrequencyTicker() {
        let result, num, className;
        let { goals, type } = this.props.task;
        let { count, goal } = goals[0];        

        if (count === 0) {
            num = goal;
            className = 'hollow';
        } else {
            num = count;
            className = 'solid';
        }
        let value = (count < goal) ? this.convertFrequency(num) : '√';
        value = (type === 'time') ? 'I' : value;  
        return (
            <button className="task-btn" onClick={this.incrementGoal.bind(this, 1)}>
                <span className={className}>{value}</span>
            </button>
        );
    }

    renderCount() {
        let { goals } = this.props.task;
        let { count, goal } = goals[0];
        return(
            <span className="count">
                {`${count} / ${goal}`}
            </span>    
        );
    }

    renderBtns() {
        let result = [];
        if (this.props.btnsEnabled) {
            result.push(
                <div className="increment-btns ibm">
                    <button className="increment-btn" onClick={this.incrementGoal.bind(this, -1)}>-</button>
                    <button className="increment-btn" onClick={this.incrementGoal.bind(this, 1)}>+</button>
                </div>
            ); 
        }
        return result;
    }

    render() {
        return(
            <li className="task">
                {this.renderLabel()}
                {this.renderFrequencyTicker()}
                {this.renderCount()}
                {this.renderBtns()}          
            </li>
        );
    }
}

export default TaskFrequency;