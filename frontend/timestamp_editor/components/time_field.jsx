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
        this.changeValueInStore = this.changeValueInStore.bind(this);        
    }

    componentDidMount() {
        this.getData();        
    }

    getData() {
        let time = moment(this.props.time);   
        let date = time.format('ddd MMM DD');
        let hour = parseInt(time.format('hh'));
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
    }

    changeValueInStore(change, field) {
        let result, subResult;
        // let {field} = this.props;
        let key = Object.keys(change)[0];
        let currentDate = moment(this.props.time);
        if (key === 'dates') {
            let newDate = moment(change[key]).get('date');
            subResult = currentDate.date(newDate).format('YYYY-MM-DD HH:mm:ss');
        } else {
            subResult = currentDate[key](change[key]).format('YYYY-MM-DD HH:mm:ss');
        }
        result = `${subResult}.000`;        
        this.props.changeTimestampValue({field, result});
    }    

    revealDropDown() {
        this.setState({dropdownRevealed: true});
    }

    render() {
        let {time, changeValue, field} = this.props;
        let dataWithIndeces = this.getData();
        // debugger;
        let capitalField = `${field.slice(0, 1).toUpperCase()}${field.slice(1)}`;
        return(
            <div className="tbp-field" onClick={this.revealDropDown}>
                <div className="fb space-between">
                    <label className="tbp-label">{capitalField} Time: </label>
                    <p className="tbp-value">{moment(time).format("MMM DD, YYYY, h:mm A")}</p>
                </div>
                <FieldDropdown 
                    field={field} 
                    dataWithIndeces={dataWithIndeces} 
                    revealed={this.state.dropdownRevealed} 
                    changeValueInStore={this.changeValueInStore} />
            </div>
        );
    }
}

export default TimeField;