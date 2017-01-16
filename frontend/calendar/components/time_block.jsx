import React, {Component} from 'react';
// import * as actions from '../actions';

class TimeBlock extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="time-block" style={{'backgroundColor': this.props.color}}>
            </div>
        );
    }
}

export default TimeBlock;