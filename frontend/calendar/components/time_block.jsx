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
        hashHistory.push(`calendar/timestamp-editor/${this.props.timestampId}`);
    }

    render() {
        let multiplier = 2;
        let start = this.getTotalMinutes(this.props.start) * multiplier;
        let end = this.getTotalMinutes(this.props.end) * multiplier;
        let height = (end - start > 2) ? end - start : 2;
        let style = {
            backgroundColor: this.props.task.color,
            top: `${start}px`,
            height: `${height}px`
        };         
        return(
            <div className="time-block" style={style} onClick={this.editTimestamp}></div>
        );
    }
}

export default TimeBlock;