import React from 'react';

import * as actions from '../actions';
import {connect} from 'react-redux';

import TaskOption from './task_option';


class TaskArea extends React.Component {

    updateName(evt) {
        this.props.updateName(evt.target.value);
    }  

    render() {
        return (
            <div className="task-area">
                <h2 className="title">Task</h2>
                <div className="task-form">
                <input
                    value={this.props.state.name}
                    onChange={this.updateName.bind(this)}
                    name="name"
                    className="input task-input"
                    type="text"
                    placeholder="Name" />
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

const mapStateToProps = (state) => ({
    state
});

const mapDispatchToProps = (dispatch) => ({
    updateName: payload => dispatch(actions.updateName(payload)),
    optionChange: payload => dispatch(actions.optionChange(payload))
});

//   handleOptionChange(evt) {
//     let property = (evt.target.name === 'goal-type') ? 'goalType' : 'goalInterval';
//     let value = evt.target.value;
//     this.props.optionChange();
//     this.setState({[property]: value });
//   }

export default connect(mapStateToProps, mapDispatchToProps)(TaskArea);