import React, {Component} from 'react';
import TimeBlockPopup from './time_block_popup';
// import * as actions from '../actions';

class TimeBlock extends Component {
    constructor(props) {
        super(props);
    }

    getTotalMinutes(timeStr) {
        let mins = moment(timeStr).hours() * 60;
        mins += moment(timeStr).get('minutes');
        return mins;
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
            <div className="time-block" style={style}>
                <TimeBlockPopup task={this.props.task} start={this.props.start} end={this.props.end} />
            </div>
        );
    }
}

export default TimeBlock;