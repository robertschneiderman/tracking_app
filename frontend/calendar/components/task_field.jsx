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
                <div className="fb space-between">        
                    <label className="tbp-label">Task: </label>
                    <p className="tbp-value">{task.name}</p>
                </div>
            </div>
        );
    }
}

export default TaskField;