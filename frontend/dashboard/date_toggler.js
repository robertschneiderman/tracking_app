import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../history/actions';

class DateToggler extends Component {
    constructor(props) {
        super(props);
        this.handleDateClick = this.handleDateClick.bind(this);
    }
    
    handleDateClick(index) {
        this.props.alternateHistories(index);
    }

    render() {
        return(
            <div className="date-toggler">
                <button className="date-btn" onClick={this.handleDateClick.bind(this, 1)}>@</button>
                <p className="date">{this.props.date}</p>
                <button className="date-btn" onClick={this.handleDateClick.bind(this, -1)}>@</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    index: state.history.index,
    date: state.history.histories[state.history.index].date
});

const mapDispatchToProps = dispatch => ({
    requestHistories: payload => dispatch(actions.requestHistories(payload)),
    alternateHistories: payload => dispatch(actions.alternateHistories(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(DateToggler);