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
        let {data} = this.props;
        let current = moment(this.props.current);

        let month = current.format('MMM');
        let date = current.get('date');
        let hour = current.get('hours');
        let minute = current.get('minutes');

        return {
            months: [month, data.months.indexOf(month)],
            dates: [date, this.datesInMonth(month).indexOf(date)],
            hours: [hour, data.hours.indexOf(hour)],
            minutes: [minute, data.minutes.indexOf(minute)],
        };
    }

    datesInMonth(month = this.state.months[0]) {
        let numOfDays = moment(month, "MMM").endOf('month').get('date');
        return getRange(1, numOfDays);
    }

    changeValue(key, idx) {
        // debugger;
        let units = (key !== 'dates') ? this.props.data[key] : this.datesInMonth();
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