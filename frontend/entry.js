import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import Signin from './auth/components/signin';
import Signup from './auth/components/signup';
import Signout from './auth/components/signout';
import RequireAuth from './auth/components/require_auth';
import Welcome from './welcome';
import Dashboard from './dashboard/index';
import NewTask from './new_task/components/index.jsx';
import { AUTH_USER } from './auth/types';
import * as historyActions from './history/actions';

import store from './store'; 

const token = localStorage.getItem('token');
const currentUser = localStorage.getItem('currentUser');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

if (currentUser) {
  store.dispatch(historyActions.requestHistories(currentUser));
  // store.dispatch({ type: 'REQUEST_USER', payload: currentUser });
}

window.store = store;

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

