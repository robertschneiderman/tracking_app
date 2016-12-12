import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../history/actions';

class DateToggler extends Component {
    constructor(props) {
        super(props);
        this.handleDateClick = this.handleDateClick.bind(this);
    }
    
    handleDateClick() {
        this.props.requestHistories(this.props.index);
    }

    render() {
        return(
            <div className="date-toggler">
                <button className="date-btn" onClick={this.handleDateClick}>@</button>
                <p className="date">{this.props.date}</p>
                <button className="date-btn" onClick={this.handleDateClick}>@</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    index: state.index,
    date: state.history.date
});

const mapDispatchToProps = dispatch => ({
    requestHistories: payload => dispatch(actions.requestHistories(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DateToggler);