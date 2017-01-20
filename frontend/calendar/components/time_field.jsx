import React, {Component} from 'react';
import moment from 'moment';

// import * as actions from '../actions';

class TimeField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {time} = this.props;
        return(
            <div className="">
                <label className="tbp-label">Start Time: </label>
                <p className="tbp-value">{moment(time).format("MMM DD, YYYY, h:mm A")}</p>
            </div>
        );
    }
}

export default TimeField;