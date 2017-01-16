import * as API from './api_util';
import * as actions from './actions';
// import {updateHistory} from '../history/actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = ({dispatch}) => next => action => {

  const createSuccess = res => {
    let history = res.data;
    hashHistory.push('/dashboard');
    dispatch(actions.receiveTask(history));
  };  

  const getSuccess = res => {
    let tasks = res.data;
    dispatch(actions.receiveTasks(tasks));
  };       

  switch (action.type) {
    case "CREATE_TASK":
      API.createTask(action.payload, createSuccess);
      return next(action); 
    case "REQUEST_TASKS":
      API.getTasks(getSuccess);
      return next(action);        
    default:
      return next(action);
  }
};   

export default taskMiddleware;