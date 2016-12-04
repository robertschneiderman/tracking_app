import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import taskReducer from './task_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  tasks: taskReducer
});

export default rootReducer;