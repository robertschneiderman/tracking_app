import React, {Component} from 'react';
// import * as actions from '../actions';

class Incrementer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {changeValue, field, current, idx} = this.props;
        return(
            <div className="incrementer">
                <p className="incrementer-value">{current}</p>
                <div className="incrementer-btns">
                    <button className="incrementer-btn" onClick={() => changeValue(field, idx+1)}>+</button>
                    <button className="incrementer-btn" onClick={() => changeValue(field, idx-1)}>-</button>
                </div>
            </div>
        );
    }
}

export default Incrementer;