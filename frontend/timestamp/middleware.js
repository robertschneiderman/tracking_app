import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const timestampMiddleware = ({dispatch}) => next => action => {

  const createSuccess = res => {
    dispatch(actions.receiveTimestamp(res.data.timestamp));
  };   

  const editSuccess = res => {
    dispatch(actions.receiveTimestamp(res.data.timestamp));
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

export default timestampMiddleware;