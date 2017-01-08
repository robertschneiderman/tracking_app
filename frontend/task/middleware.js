import * as API from './api_util';
import * as ACTIONS from './actions';
// import {updateHistory} from '../history/actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = ({dispatch}) => next => action => {

  const getSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };       

  switch (action.type) {

    case "REQUEST_TASKS":
      API.getTasks(getSuccess);
      return next(action);        
    default:
      return next(action);
  }
};   

export default taskMiddleware;