import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../history/actions';

class DateToggler extends Component {
    constructor(props) {
        super(props);
        this.handleDateClick = this.handleDateClick.bind(this);
    }
    
    handleDateClick(increment) {
        this.props.alternateHistories(increment);
        let newIndex = this.props.index + increment;
        if (newIndex >= this.props.historiesLength - 1) { 
            this.props.requestHistories(newIndex);
        }
    }

    render() {
        debugger;
        let decrementBtn = (this.props.index !== this.props.historiesLength - 1) ? <button className="date-btn" onClick={this.handleDateClick.bind(this, 1)}>@</button> : false;
        let incrementBtn = (this.props.index !== 0) ? <button className="date-btn" onClick={this.handleDateClick.bind(this, -1)}>@</button> : false;
        return(
            <div className="date-toggler">
                {decrementBtn}
                <p className="date">{this.props.date}</p>
                {incrementBtn}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    index: state.history.index,
    date: state.history.histories[state.history.index].date,
    historiesLength: state.history.histories.length
});

const mapDispatchToProps = dispatch => ({
    requestHistories: payload => dispatch(actions.requestHistories(payload)),
    alternateHistories: payload => dispatch(actions.alternateHistories(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(DateToggler);