import * as API from '../util/users_api_util';
import * as ACTIONS from '../actions/user/index';
import {router, browserHistory} from 'react-router';

const userMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
    let user = res.data;
    dispatch(ACTIONS.receiveUser(user));
  };     

  switch (action.type) {

    case "REQUEST_USER":
      API.getUser(action.payload, getSuccess);
      return next(action);      
      break;          
    default:
      return next(action);
      break;      
  }
}   

export default userMiddleware;