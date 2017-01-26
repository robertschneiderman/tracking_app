import React, {Component} from 'react';
import TimeBlock from './time_block';
// import * as actions from '../actions';

class Day extends Component {
    constructor(props) {
        super(props);
    }

    // get tasks from history
    // instant access blankArray by converting timestamp start and end to idx numbers

    renderTimeBlocks() {
        let timeBlocks = [];
        let history = this.props.history;
        let tasks = history ? history.tasks : [];
        tasks.forEach(task => {
            task.timestamps.forEach(timestamp => {
                timeBlocks.push(<TimeBlock task={task} timestampId={timestamp._id} key={timestamp._id} start={timestamp.start} end={timestamp.end} />);
            });
        });
        return timeBlocks;
    }
    
    render() {
        return(
            <div className="day">
                {this.renderTimeBlocks()}
            </div>
        );
    }
}

export default Day;