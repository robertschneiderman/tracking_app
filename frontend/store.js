import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './root_reducer.js';
import UserMiddleware from './user/middleware';
import TaskMiddleware from './task/middleware';
import NewTaskMiddleware from './new_task/middleware';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger, UserMiddleware, TaskMiddleware, NewTaskMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
export default store;