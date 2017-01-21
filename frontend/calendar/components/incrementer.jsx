import React, {Component} from 'react';
// import * as actions from '../actions';

class Incrementer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="incrementer">
                <p className="incrementer-value">{this.props.current}</p>
                <div className="incrementer-btns">
                    <button className="incrementer-btn" onClick={() => this.props.changeValue(this.props.field, 1)}>+</button>
                    <button className="incrementer-btn" onClick={() => this.props.changeValue(this.props.field, -1)}>-</button>
                </div>
            </div>
        );
    }
}

export default Incrementer;