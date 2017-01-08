import * as API from './api_util';
import * as ACTIONS from './actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = ({dispatch}) => next => action => {

  const createSuccess = res => {
    let tasks = res.data;
    dispatch(ACTIONS.receiveTasks(tasks));
  };          

  switch (action.type) {

    case "CREATE_TIMESTAMP":
      API.createTimestamp(createSuccess);
      return next(action);           
    default:
      return next(action);
  }
};   

export default taskMiddleware;