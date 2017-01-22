import React, {Component} from 'react';
import Incrementer from './incrementer';
import moment from 'moment';

import { getRange } from '../helpers';
// import * as actions from '../actions';

class FieldDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = this.makeTimeObj(this.props.current);
        
        this.makeTimeObj = this.makeTimeObj.bind(this);
        this.changeValue = this.changeValue.bind(this);        
    }

    makeTimeObj() {
        let {data, current} = this.props;
        current = moment(current);
        let date = current.format('ddd MMM DD');
        let dateIdx = current.get('date')-1;
        let hour = current.get('hours');
        let minute = current.get('minutes');
        let meridiem = (hour > 12) ? 'AM' : 'PM';

        return {
            dates: [date, this.dates(date).indexOf(date)],
            hours: [hour, data.hours.indexOf(hour)],
            minutes: [minute, data.minutes.indexOf(minute)],
            meridiem: [meridiem, data.meridiem.indexOf(meridiem)]
        };
    }

    rangeOfDaysInMonth(month) {
        let numOfDays = moment(month+1, "M").daysInMonth();
        return getRange(1, numOfDays);
    }

    dates(date) {
        // debugger;
        let month = moment(date, 'ddd MMM DD').get('month');
        let previousMonth = (month - 1 !== -1) ? month - 1 : 11;
        let nextMonth = (month + 1) % 12;
        // let range = this.rangeOfDaysInMonth(previousMonth).concat(this.rangeOfDaysInMonth(month)).concat(this.rangeOfDaysInMonth(nextMonth));
        let result = this.rangeOfDaysInMonth(previousMonth).map(date => moment(`${previousMonth+1} ${date}`, "M D").format('ddd MMM DD'));
        result = result.concat(this.rangeOfDaysInMonth(month).map(date => moment(`${month+1} ${date}`, "M D").format('ddd MMM DD')));
        result = result.concat(this.rangeOfDaysInMonth(nextMonth).map(date => moment(`${nextMonth+1} ${date}`, "M D").format('ddd MMM DD')));
        return result;
    }

    changeValue(key, idx) {
        debugger;
        // let units = (key !== 'dates') ? this.props.data[key] : this.datesInMonth();
        let units = this.props.data[key];
        idx = (idx === -1) ? units.length-1 : idx;
        let newValue = units[idx % units.length];
        this.setState({ [key]: [newValue, idx] });
    }

    renderIncrementers() {
        let incrementers = [];
        // let currentObj = this.makeTimeObj();
        for (let key in this.state) {
            incrementers.push(
                <Incrementer 
                    field={key}
                    current={this.state[key][0]}
                    idx={this.state[key][1]}
                    changeValue={this.changeValue} />);
        }
        return incrementers;
    }

    render() {
        let className = this.props.revealed ? "field-dropdown" : "field-dropdown none";
        return(
            <div className={className}>
                {this.renderIncrementers()}
            </div>
        );
    }
}

export default FieldDropdown;