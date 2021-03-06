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
        for (let i = 30; i <= 1440; i+=30) {
            
            if (i % 60 === 0) {
                lines.push(
                    <div className="line-container solid" key={i}>
                        <label className="line-label">{hourCount} {meridiem}</label>
                    </div>
                );
                hourCount++;
            } else {
                lines.push(<div className="line-container dotted" key={i}></div>);
            }
            
            if (hourCount === 12 && i % 60 === 0) meridiem = meridiem === 'AM' ? 'PM' : 'AM';
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