import React, {Component} from 'react';
import moment from 'moment';

import { getRange, rangeOfDaysInMonth, getDates } from '../helpers';
import FieldDropdown from './field_dropdown';

// import * as actions from '../actions';

class TimeField extends Component {
    constructor(props) {
        super(props);

        this.state={
            dropdownRevealed: false
        };

        this.getData = this.getData.bind(this);
        this.revealDropDown = this.revealDropDown.bind(this);
    }

    componentDidMount() {
        this.getData();        
    }

    getData() {
        let time = moment(this.props.time);   
        let date = time.format('ddd MMM DD');
        let hour = time.get('hours');
        let minute = time.get('minutes');
        let meridiem = (hour > 12) ? 'AM' : 'PM';

        let dates = getDates(time);   
        let hours = getRange(1, 12);  
        let minutes = getRange(0, 59);
        let meridiems = ['AM', 'PM'];

        let dataWithIndeces = {
            dates: [dates, dates.indexOf(date)],
            hours: [hours, hours.indexOf(hour)],
            minutes: [minutes, minutes.indexOf(minute)],
            meridiems: [meridiems, meridiems.indexOf(meridiem)],
        };
        return dataWithIndeces;

        // this.props.storeDataWithIndeces({field: this.props.field, dataWithIndeces});
    }

    revealDropDown() {
        this.setState({dropdownRevealed: true});
    }

    render() {
        let {time, changeValue} = this.props;
        let dataWithIndeces = this.getData();
        // debugger;
        return(
            <div className="tbp-field" onClick={this.revealDropDown}>
                <div className="fb space-between">
                    <label className="tbp-label">Start Time: </label>
                    <p className="tbp-value">{moment(time).format("MMM DD, YYYY, h:mm A")}</p>
                </div>
                <FieldDropdown field={this.props.field} dataWithIndeces={dataWithIndeces} revealed={this.state.dropdownRevealed} changeValue={this.props.changeValue} />
            </div>
        );
    }
}

export default TimeField;