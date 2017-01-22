import React, {Component} from 'react';
import moment from 'moment';

import { getRange } from '../helpers';
import FieldDropdown from './field_dropdown';

// import * as actions from '../actions';


const DATA = {
    months: ['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'],
    hours: getRange(1, 12),
    minutes: getRange(0, 59)
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