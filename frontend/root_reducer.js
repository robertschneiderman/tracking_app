import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import user from './user/reducer';
import task from './task/reducer';
import goal from './goal/reducer';
import calendar from './calendar/reducer';
import newTask from './new_task/reducer';
import history from './history/reducer';
import timestamp from './timestamp/reducer';
import dashboard from './dashboard/reducer';
import data from './data/reducer';


const appReducer = combineReducers({
  auth,
  goal,
  calendar,
  dashboard,
  data,
  form,
  history,
  newTask,
  task,
  timestamp,
  user
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;