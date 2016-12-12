import * as API from './api_util';
import * as ACTIONS from './actions';
import { receiveTask } from '../task/actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const createSuccess = res => {
    let tasks = res.data;
    hashHistory.push('/dashboard');
    dispatch(receiveTask(tasks));
  };       

  switch (action.type) {

    case "CREATE_TASK":
      API.createTask(action.payload, createSuccess);
      return next(action);      
      break;
    default:
      return next(action);
      break;      
  }
};   

export default taskMiddleware;