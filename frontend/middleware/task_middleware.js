import * as API from '../util/tasks_api_util';
import * as ACTIONS from '../actions/task/index';
import {router, browserHistory} from 'react-router';

const taskMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const createSuccess = taskInfo => {
    console.log("Success!");
    console.log("taskInfo:", taskInfo);
    dispatch(ACTIONS.receiveTask(photos));
    // debugger;
  };    

  switch (action.type) {

    case "CREATE_TASK":
    console.log("action.payload:", action.payload);
      API.createTask(action.payload, createSuccess);
      return next(action);      
      break; 
    default:
      return next(action);
      break;      
  }
}   

export default taskMiddleware;