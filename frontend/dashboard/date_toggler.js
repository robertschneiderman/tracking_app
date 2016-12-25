import React, {Component} from 'react';
import { connect } from 'react-redux';

class DateToggler extends Component {
    constructor(props) {
        super(props);
        this.handleDateClick = this.handleDateClick.bind(this);
    }
    
    handleDateClick(increment) {
        this.props.alternateHistories(increment);
        let newIndex = this.props.index + increment;
        if (newIndex >= this.props.historiesLength - 1) { 
            this.props.requestHistories(newIndex+1);
        }
    }

    render() {
        let decrementBtn = (this.props.index !== this.props.historiesLength - 1) ? <button className="date-btn" onClick={this.handleDateClick.bind(this, 1)}>&lt;</button> : false;
        let incrementBtn = (this.props.index !== 0) ? <button className="date-btn" onClick={this.handleDateClick.bind(this, -1)}>&gt;</button> : false;
        return(
            <div className="date-toggler">
                {decrementBtn}
                <p className="date">{this.props.date}</p>
                {incrementBtn}
            </div>
        );
    }
}

export default DateToggler;