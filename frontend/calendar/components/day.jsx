import React, {Component} from 'react';
import TimeBlock from './time_block';
// import * as actions from '../actions';

class Day extends Component {
    constructor(props) {
        super(props);
    }

    renderTimeBlocks() {
        let timeBlocks = [];
        for (let i = 1; i <= 1440; i++) {
            timeBlocks.push(<TimeBlock />);
        }
        return timeBlocks;
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