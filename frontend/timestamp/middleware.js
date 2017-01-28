import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = ({dispatch}) => next => action => {

  const createSuccess = res => {
  };   

  const editSuccess = res => {
    debugger;
    actions.receiveTimestamp(res.data);
  };  

  const deleteSuccess = res => {
  };          

  switch (action.type) {

    case "CREATE_TIMESTAMP":
      API.createTimestamp(action.payload, createSuccess);
      return next(action);           
    case "FINISH_TIMESTAMP":
      API.finishTimestamp(action.payload, createSuccess);
      return next(action);
    case "EDIT_TIMESTAMP":
      API.editTimestamp(action.payload, editSuccess);
      return next(action);
    case "DELETE_TIMESTAMP":
      API.deleteTimestamp(action.payload, deleteSuccess);
      return next(action);
    default:
      return next(action);
  }
};   

export default taskMiddleware;