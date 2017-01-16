import React, {Component} from 'react';
// import * as actions from '../actions';

class DayLabel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return(
            <div className="day-label">
                <p className="day-label-day"><strong>{DAYS[this.props.idx]}</strong></p>
                <p className="day-label-date">{this.props.date}</p>
            </div>
        );
    }
}

export default DayLabel;