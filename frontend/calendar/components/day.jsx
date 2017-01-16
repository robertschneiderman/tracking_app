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
        let { history } = this.props.history;
        for (let i = 1; i <= 1440; i++) {
            let date = new Date();
            
            date.setHours(0,i,0,0);
            timeBlocks.push(<TimeBlock />);
        }

        return timeBlocks;        
    }

    fillTimeBlocks() {
        let { tasks } = this.props.history;
        timeBlocks.map(tb => {

        });
    }

    renderTimeBlocks() {
        let timeBlocks = this.blankTimeBlocks();
        this.fillTimeBlocks(timeBlocks);
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