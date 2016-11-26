import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/task/';

import Person from './person';

const Dashboard = (props) => (
  <div className="dashboard">
    <Person />
  </div> 
)

export default connect(null, actions)(Dashboard);