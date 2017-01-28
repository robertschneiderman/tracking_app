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
    }

    changeValueInStore(state, field) {
        let result;
        // let {field} = this.props;
        if (field === 'start' || field === 'end') {

            let key = Object.keys(state)[0];
            let currentDate = moment(this.props.time);
            let subResult = currentDate[key](state[key]).format('YYYY-MM-DD HH:mm:ss');


            // let datesData = state['dates'][0];
            // let datesIdx = state['dates'][1];
            // let hoursData = state['hours'][0];
            // let hoursIdx = state['hours'][1];
            // let minutesData = state['minutes'][0];
            // let minutesIdx = state['minutes'][1];
            // let meridiemsData = state['meridiems'][0];
            // let meridiemsIdx = state['meridiems'][1];
            // let year = moment().year();           
            // let subResult = moment(`${datesData[datesIdx]} ${year} ${hoursData[hoursIdx]}:${minutesData[minutesIdx]} ${meridiemsData[meridiemsIdx]}`, "ddd MMM DD YYYY h:mm A").format('YYYY-MM-DD HH:mm:ss');
            result = `${subResult}.000`;        
            debugger;
        }
        this.props.changeTimestampValue({field, result});
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
                <FieldDropdown 
                    field={this.props.field} 
                    dataWithIndeces={dataWithIndeces} 
                    revealed={this.state.dropdownRevealed} 
                    changeValueInStore={this.changeValueInStore} />
            </div>
        );
    }
}

export default TimeField;