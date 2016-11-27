import * as API from '../util/tasks_api_util';
import * as ACTIONS from '../actions/task/index';
import {router, browserHistory} from 'react-router';

const taskMiddleware = store => next => action => {

  let dispatch = store.dispatch;


  const createSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
    browserHistory.push('/dashboard');
  };

  const getSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };

  const incrementSuccess = res => {
    // debugger;
    let task = res.data;
    dispatch(ACTIONS.receiveTask(task));
  };        

  switch (action.type) {

    case "CREATE_TASK":
      API.createTask(action.payload, createSuccess);
      return next(action);      
      break;
    case "REQUEST_TASKS":
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