import React, {Component} from 'react';

class DateToggler extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="date-toggler">
                <p className="date"></p>
            </div>
        );
    }
}

export default DateToggler;