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
        this.changeValueInStore = this.changeValueInStore.bind(this);    
    }

    revealDropDown() {
        this.setState({dropdownRevealed: true});
    }

    taskNames(obj) {
        let array = [];
        for (let key in obj) array.push(obj[key].name);
        return array;
    }

    findSelectedTask(taskName) {
        for (let key in this.props.tasks) {
            let task = this.props.tasks[key];
            if (task.name === taskName) return task;
        }
    }

    changeValueInStore(change) {
        let key = Object.keys(change)[0];
        let taskName = change[key];
        // let taskName = change.tasks[0][change.tasks[1]];
        let selectedTask = this.findSelectedTask(taskName);
        this.props.changeTaskValue({field: 'newTaskId', result: selectedTask._id });
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
                <FieldDropdown 
                    field={this.props.field} 
                    dataWithIndeces={{tasks:[tasks, idx]}}
                    revealed={this.state.dropdownRevealed}
                    changeValueInStore={this.changeValueInStore} />                
            </div>
        );
    }
}

export default TaskField;