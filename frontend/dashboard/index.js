import React, {Component} from 'react';
import DateToggler from './date_toggler';
import Persons from './persons';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="dashboard">
                <DateToggler />
                <Persons />
            </div>
        );
    }
}

export default Dashboard;