import React from 'react';

import * as actions from '../actions';
import {connect} from 'react-redux';

import TaskOption from './task_option';


class TaskArea extends React.Component {

    constructor(props) {
        super(props);
        this.selectColor = this.selectColor.bind(this);
    }

    updateName(evt) {
        this.props.updateName(evt.target.value);
    }

    selectColor(color) {
        this.props.selectColor(color);
    }

    renderColorOptions() {
        let colorOptions = ['red', 'orange', 'green', 'blue', 'yellow', 'teal', 'grey', 'purple'];
        return colorOptions.map(color => {
            let className = `color-option ${color}`;
            if (this.props.selected === color) className += ' selected';
            return <button className={className} onClick={this.selectColor.bind(this, color)}></button>;
        });
    }

    render() {
        return (
            <div className="task-area">
                <h2 className="title">Task</h2>
                <div className="task-form">
                <input
                    value={this.props.name}
                    onChange={this.updateName.bind(this)}
                    name="name"
                    className="input task-input"
                    type="text"
                    placeholder="Name" />
                </div>
                <div className="color-options">
                    {this.renderColorOptions()}
                </div>
                <div className="goal-options">
                <div className="goal-option-group">
                    <h3 className="subtitle">Type</h3>
                    <TaskOption name="Time" type="type" onChange={this.props.optionChange} />
                    <TaskOption name="Frequency" type="type" onChange={this.props.optionChange} />
                    <TaskOption name="Truthy" type="type" onChange={this.props.optionChange} />
                </div>
                
                <div className="goal-option-group">
                    <h3 className="subtitle">Interval</h3>
                    <TaskOption name="Daily" type="interval" onChange={this.props.optionChange} />
                    <TaskOption name="Weekly" type="interval" onChange={this.props.optionChange} />
                    <TaskOption name="Monthly" type="interval" onChange={this.props.optionChange} />
                </div>        
                </div>          
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { newTask } = state;
    let { name, selected } = newTask;
    return { name, selected };
};

const mapDispatchToProps = (dispatch) => ({
    updateName: payload => dispatch(actions.updateName(payload)),
    optionChange: payload => dispatch(actions.optionChange(payload)),
    selectColor: color => dispatch(actions.selectColor(color))
});

//   handleOptionChange(evt) {
//     let property = (evt.target.name === 'goal-type') ? 'goalType' : 'goalInterval';
//     let value = evt.target.value;
//     this.props.optionChange();
//     this.setState({[property]: value });
//   }

export default connect(mapStateToProps, mapDispatchToProps)(TaskArea);