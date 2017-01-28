import React, {Component} from 'react';
import moment from 'moment';

import {router, hashHistory} from 'react-router';
// import * as actions from '../actions';

class TimeBlock extends Component {
    constructor(props) {
        super(props);
        this.editTimestamp = this.editTimestamp.bind(this);
    }

    getTotalMinutes(timeStr) {
        let mins = moment(timeStr).hours() * 60;
        mins += moment(timeStr).get('minutes');
        return mins;
    }

    editTimestamp() {
        let {task, timestamp} = this.props;
        let initialState = {
            originalTaskId: task._id,
            newTaskId: undefined,
            timestamp: {
                _id: timestamp._id,
                start: timestamp.start,
                end: timestamp.end
            }
        };    
        this.props.populateTimestampEditor(initialState);
        hashHistory.push(`calendar/timestamp-editor/`);
    }

    render() {
        let {task, timestamp} = this.props;
        let {start, end} = timestamp;
        let multiplier = 2;
        start = this.getTotalMinutes(start) * multiplier;
        end = this.getTotalMinutes(end) * multiplier;
        let height = (end - start > 2) ? end - start : 2;
        let style = {
            backgroundColor: task.color,
            top: `${start}px`,
            height: `${height}px`
        };         
        return(
            <div className="time-block" style={style} onClick={this.editTimestamp}></div>
        );
    }
}

export default TimeBlock;