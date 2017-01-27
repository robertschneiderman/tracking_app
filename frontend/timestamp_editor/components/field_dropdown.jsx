import React, {Component} from 'react';
import Incrementer from './incrementer';
import moment from 'moment';

import { getRange } from '../helpers';
// import * as actions from '../actions';

class FieldDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.dataWithIndeces;

        this.changeValue = this.changeValue.bind(this);
        this.renderIncrementers = this.renderIncrementers.bind(this);
    }

    editTimestamp() {
        let {timestampEditor} = this.props;
        let result = {};
        for (let key in timestampEditor) {
            let field = timestampEditor[key];
            if (key === 'start' || key === 'end') {
                let datesData = field['dates'][0];
                let datesIdx = field['dates'][1];
                let hoursData = field['hours'][0];
                let hoursIdx = field['hours'][1];
                let minutesData = field['minutes'][0];
                let minutesIdx = field['minutes'][1];
                let meridiemsData = field['meridiems'][0];
                let meridiemsIdx = field['meridiems'][1];
                let year = moment().year();           
                let subResult = moment(`${datesData[datesIdx]} ${year} ${hoursData[hoursIdx]}:${minutesData[minutesIdx]} ${meridiemsData[meridiemsIdx]}`, "ddd MMM DD YYYY h:mm A").format('YYYY-MM-DD hh:mm:ss');
                result[key] = `${subResult}.000Z`;
            } else {

            }
        }
    }    

    changeValue(incrementer, idx) {
        let units = this.state[incrementer][0];
        idx = (idx === -1) ? units.length-1 : idx % units.length;
        this.setState({ [incrementer]: [units, idx] });
        let result;
        let {field} = this.props;
        if (field === 'start' || field === 'end') {
            let datesData = this.state['dates'][0];
            let datesIdx = this.state['dates'][1];
            let hoursData = this.state['hours'][0];
            let hoursIdx = this.state['hours'][1];
            let minutesData = this.state['minutes'][0];
            let minutesIdx = this.state['minutes'][1];
            let meridiemsData = this.state['meridiems'][0];
            let meridiemsIdx = this.state['meridiems'][1];
            let year = moment().year();           
            let subResult = moment(`${datesData[datesIdx]} ${year} ${hoursData[hoursIdx]}:${minutesData[minutesIdx]} ${meridiemsData[meridiemsIdx]}`, "ddd MMM DD YYYY h:mm A").format('YYYY-MM-DD hh:mm:ss');
            result = `${subResult}.000Z`;        
        }
        debugger;
        this.props.changeValue({field, result});
    }

    renderIncrementers() {
        let incrementers = [];
        // let currentObj = this.makeTimeObj();
        for (let key in this.state) {
            let data = this.state[key][0];
            let idx = this.state[key][1];
            let current = data[idx];
            incrementers.push(
                <Incrementer 
                    incrementer={key}
                    current={current}
                    idx={idx}
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