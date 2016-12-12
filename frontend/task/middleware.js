import * as API from './api_util';
import * as ACTIONS from './actions';
import {updateHistory} from '../history/actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };       

  const incrementSuccess = res => {
    // debugger;
    let task = res.data;
    console.log(task);
    // dispatch(ACTIONS.receiveTask(task));
    dispatch(updateHistory(task));
  };   

  switch (action.type) {

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
};   

export default taskMiddleware;