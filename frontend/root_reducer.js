import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import taskReducer from './task/reducer';
import goalReducer from './goal/reducer';
import newTaskReducer from './new_task/reducer';
import historyReducer from './history/reducer';
import dashboardReducer from './dashboard/reducer';
import dataReducer from './data/reducer';


const appReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
  goal: goalReducer,
  newTask: newTaskReducer,
  history: historyReducer,
  dashboard: dashboardReducer,
  data: dataReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;