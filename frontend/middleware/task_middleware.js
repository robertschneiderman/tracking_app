import * as API from '../util/tasks_api_util';
import * as ACTIONS from '../actions/task/index';
import {router, browserHistory} from 'react-router';

const taskMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };

  const incrementSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };        

  switch (action.type) {

    case "CREATE_TASK":
      API.createTask(action.payload, getSuccess);
      return next(action);      
      break;
    case "GET_TASKS":
      API.getTasks(getSuccess);
      return next(action);      
      break;
    case "INCREMENT_GOAL":
      API.incrementGoal(action.payload.taskId, action.payload.count, incrementSuccess);
      return next(action);      
      break;           
    default:
      return next(action);
      break;      
  }
}   

export default taskMiddleware;