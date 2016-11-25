import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import Dashboard from './components/dashboard/index';
import NewTask from './components/new_task/index';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import TaskMiddleware from './middleware/task_middleware'

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger, TaskMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
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

