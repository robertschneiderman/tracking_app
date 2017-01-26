import React, {Component} from 'react';
import Incrementer from './incrementer';
import moment from 'moment';

import { getRange } from '../helpers';
// import * as actions from '../actions';

class FieldDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.data;

        this.changeValue = this.changeValue.bind(this);
        this.renderIncrementers = this.renderIncrementers.bind(this);
    }

    changeValue(key, idx) {
        // debugger;
        let units = this.state[key][0];
        idx = (idx === -1) ? units.length-1 : idx % units.length;
        this.setState({ [key]: [units, idx] });
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
                    field={key}
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