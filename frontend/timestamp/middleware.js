import * as API from './api_util';
import * as ACTIONS from './actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = ({dispatch}) => next => action => {

  const createSuccess = res => {
  };          

  switch (action.type) {

    case "CREATE_TIMESTAMP":
      API.createTimestamp(action.payload, createSuccess);
      return next(action);           
    case "FINISH_TIMESTAMP":
      API.finishTimestamp(action.payload, createSuccess);
      return next(action);      
    default:
      return next(action);
  }
};   

export default taskMiddleware;