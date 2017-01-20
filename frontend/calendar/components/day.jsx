import React, {Component} from 'react';
import TimeBlock from './time_block';
import moment from 'moment';
// import * as actions from '../actions';

class Day extends Component {
    constructor(props) {
        super(props);
    }

    // get tasks from history
    // instant access blankArray by converting timestamp start and end to idx numbers

    getTotalMinutes(timeStr) {
        let mins = moment(timeStr).hours() * 60;
        mins += moment(timeStr).get('minutes');
        return mins;
    }

    renderTimeBlocks() {
        let timeBlocks = [];
        let history = this.props.history;
        let tasks = history ? history.tasks : [];
        tasks.forEach(task => {
            task.timestamps.forEach(timestamp => {
                let startMins = this.getTotalMinutes(timestamp.start);
                let endMins = this.getTotalMinutes(timestamp.end);
                timeBlocks.push(<TimeBlock color={task.color} key={timestamp._id} start={startMins} end={endMins} />);
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