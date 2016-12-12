import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import taskReducer from './task/reducer';
import newTaskReducer from './new_task/reducer';
import historyReducer from './history/reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  tasks: taskReducer,
  newTask: newTaskReducer,
  history: historyReducer
});

export default rootReducer;