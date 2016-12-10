import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import UserMiddleware from '../middleware/user_middleware';
import TaskMiddleware from '../middleware/task_middleware';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger, UserMiddleware, TaskMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
export default store;