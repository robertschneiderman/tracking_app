import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import Dashboard from './components/dashboard/index';
import NewTask from './components/new_task/index.jsx';
import { AUTH_USER } from './actions/types';

import store from './store/store'; 

const token = localStorage.getItem('token');
const currentUser = localStorage.getItem('currentUser');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

if (currentUser) {
  store.dispatch({ type: 'REQUEST_USER', payload: currentUser });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="dashboard" component={RequireAuth(Dashboard)} />
        <Route path="new-task" component={RequireAuth(NewTask)} />
      </Route>
    </Router>
  </Provider>
, document.querySelector('.container'));

