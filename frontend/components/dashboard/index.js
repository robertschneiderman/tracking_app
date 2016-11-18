import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Dashboard = (props) => (
  <div className="dashboard">Dashboard</div> 
);

export default connect(null, actions)(Dashboard);