import React, {Component} from 'react';
// import * as actions from '../actions';

class TimeGraph extends Component {
    constructor(props) {
        super(props);
    }

    renderLines() {
        let hourCount = 1;
        let meridiem = 'AM';
        let lines = [];
        for (let i = 0; i < 1440; i+=30) {
            
            let className = (i % 60 === 0) ? "line-container solid" : "line-container dotted";
            lines.push(
                <div className={className} key={i}>
                    <label className="line-label">{hourCount} {meridiem}</label>
                </div>
            );
            hourCount++;
            if (hourCount === 12) meridiem = meridiem === 'PM' ? 'AM' : 'PM';
            if (hourCount === 13) hourCount = 1;
        }
        return lines;
    }

    render() {
        return(
            <div className="time-graph">
                {this.renderLines()}
            </div>
        );
    }
}

export default TimeGraph;