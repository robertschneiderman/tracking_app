import React, {Component} from 'react';
import moment from 'moment';

import {router, hashHistory} from 'react-router';
// import * as actions from '../actions';

const multiplier = 2;

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

    renderTimeBlocks() {
        let {task, timestamp, special} = this.props;
        let {start, end} = timestamp;

        let s1 = this.getTotalMinutes(start) * multiplier;
        let h1 = 2880 - s1;
        let h2 = this.getTotalMinutes(end) * multiplier;
        let style1 = {
            backgroundColor: task.color,
            top: s1,
            height: h1
        };
        let style2 = {
            backgroundColor: task.color,
            top: 0,
            height: h2,
            transform: 'translateX(100%)',
            left: '1px'
        };    

        return (     
            <div className="time-blocks">
                <div className="time-block" style={style1} onClick={this.editTimestamp}></div>
                <div className="time-block" style={style2} onClick={this.editTimestamp}></div>
            </div>        
        );
    }

    renderTimeBlock() {
        let {task, timestamp, special} = this.props;
        let {start, end} = timestamp;
                
        start = this.getTotalMinutes(start) * multiplier;
        end = this.getTotalMinutes(end) * multiplier;
        let height = (end - start > 2) ? end - start : 2;
        let style = {
            backgroundColor: task.color,
            top: `${start}px`,
            height: `${height}px`
        };
        return <div className="time-block" style={style} onClick={this.editTimestamp}></div>;
    }

    render() {
        let {task, timestamp, special} = this.props;
        let {start, end} = timestamp;
        let result = (moment(start).get('date') !== moment(end).get('date')) ? this.renderTimeBlocks() : this.renderTimeBlock();

        return result;
    }
}

export default TimeBlock;