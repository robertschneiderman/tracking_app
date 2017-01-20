import React, {Component} from 'react';
import moment from 'moment';

// import * as actions from '../actions';

class TaskField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {task} = this.props;
        return(
            <div className="tbp-field">
                <label className="tbp-label">Task: </label>
                <p className="tbp-value">{task.name}</p>            
            </div>
        );
    }
}

export default TaskField;