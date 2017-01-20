import React, {Component} from 'react';
// import * as actions from '../actions';

class TimeBlock extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let multiplier = 2;
        let start = this.props.start * multiplier;
        let end = this.props.end * multiplier;
        let height = (end - start > 2) ? end - start : 2;
        let style = {
            backgroundColor: this.props.color,
            top: `${start}px`,
            height: `${height}px`
        };         
        return(
            <div className="time-block" style={style}>
            </div>
        );
    }
}

export default TimeBlock;