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

    blankTimeBlocks() {
        let timeBlocks = [];
        for (let i = 1; i <= 1440; i++) {
            timeBlocks.push(<div className="time-block"></div>);
        }
        return timeBlocks;        
    }

    fill(color, start, end) {

    }

    fillTimeBlocks(timeBlocks) {
        let history = this.props.history;
        let tasks = history ? history.tasks : [];
        tasks.forEach(task => {
            task.timestamps.forEach(timestamp => {
                let startMins = moment(timestamp.start).hours() * 60;
                startMins += moment(timestamp.start).get('minutes');
                let endMins = moment(timestamp.end).hours() * 60;
                endMins += moment(timestamp.end).get('minutes');
                let i = startMins;
                while (i <= endMins) {
                    timeBlocks[i] = <TimeBlock color={task.color} />; 
                    i++;
                }
            });
        });
        return timeBlocks;
    }

    renderTimeBlocks() {
        let timeBlocks = this.blankTimeBlocks();
        return this.fillTimeBlocks(timeBlocks);
    }
    
    render() {
        return(
            <div className="day">
                <p className="day-number">{this.props.date}</p>
                {this.renderTimeBlocks()}
            </div>
        );
    }
}

export default Day;