import React, {Component} from 'react';
import moment from 'moment';

import FieldDropdown from './field_dropdown';

// import * as actions from '../actions';

let dates;
let date = 1;
while (date <= 31) dates.push(date);

let hours;
let hour = 1;
while (hour <= 12) hours.push(hour);

let minutes;
let minute = 0;
while (minute <= 59) minutes.push(minute);

const DATA = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dates,
    hours: [1, 2, 3],
    minutes: [10, 11, 12]
};

class TimeField extends Component {
    constructor(props) {
        super(props);
        this.state={
            dropdownRevealed: false
        };
        this.revealDropDown = this.revealDropDown.bind(this);
    }

    revealDropDown() {
        console.log("revealed?");
        this.setState({dropdownRevealed: true});
    }

    render() {
        let {time} = this.props;
        return(
            <div className="tbp-field" onClick={this.revealDropDown}>
                <div className="fb space-between">
                    <label className="tbp-label">Start Time: </label>
                    <p className="tbp-value">{moment(time).format("MMM DD, YYYY, h:mm A")}</p>
                </div>
                <FieldDropdown current={time} data={DATA} revealed={this.state.dropdownRevealed} />
            </div>
        );
    }
}

export default TimeField;