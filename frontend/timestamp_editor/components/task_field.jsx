import React, {Component} from 'react';
import moment from 'moment';

import FieldDropdown from './field_dropdown';

// import * as actions from '../actions';

class TaskField extends Component {
    constructor(props) {
        super(props);
        this.state={
            dropdownRevealed: false
        };
        this.revealDropDown = this.revealDropDown.bind(this);        
    }

    revealDropDown() {
        this.setState({dropdownRevealed: true});
    }

    taskNames(obj) {
        let array = [];
        for (let key in obj) array.push(obj[key].name);
        return array;
    }
    
    render() {
        let {task} = this.props;
        let tasks = this.taskNames(this.props.tasks);
        let idx = Object.keys(this.props.tasks).indexOf(task._id);
        // let dataWithIndeces = [tasks, task.index]
        return(
            <div className="tbp-field" onClick={this.revealDropDown}>
                <div className="fb space-between">        
                    <label className="tbp-label">Task: </label>
                    <p className="tbp-value">{task.name}</p>
                </div>
                <FieldDropdown field={this.props.field} dataWithIndeces={{tasks:[tasks, idx]}} revealed={this.state.dropdownRevealed} changeValue={this.props.changeValue} />                
            </div>
        );
    }
}

export default TaskField;