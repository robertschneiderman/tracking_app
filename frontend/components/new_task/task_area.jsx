import React from 'react';

import {actions} from '../actions/new_task';
import {connect} from 'react-redux';

import TaskOption from './task_option';

const TaskArea = props => (
    <div className="task-area">
        <h2 className="title">Task</h2>
        <div className="task-form">
        <input
            value={this.state.name}
            onChange={this.updateValue.bind(this)}
            name="name"
            className="input task-input"
            type="text"
            placeholder="Name" />
        </div>
        <div className="goal-options">
        <div className="goal-option-group">
            <h3 className="subtitle">Type</h3>
            <TaskOption name="Time" type="type" onChange={props.optionChange} />
            <TaskOption name="Frequency" type="type" onChange={props.optionChange} />
            <TaskOption name="Truthy" type="type" onChange={props.optionChange} />
        </div>
        
        <div className="goal-option-group">
            <h3 className="subtitle">Interval</h3>
            <TaskOption name="Daily" type="interval" onChange={props.optionChange} />
            <TaskOption name="Weekly" type="interval" onChange={props.optionChange} />
            <TaskOption name="Monthly" type="interval" onChange={props.optionChange} />
        </div>        
        </div>          
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    optionChange: dispatch(actions.optionChange)
});

export default connect(mapDispatchToProps)(TaskArea);