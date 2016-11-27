import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {user: [], buddy: []}, action) => {

  switch (action.type) {

    case "RECEIVE_TASKS":
      // debugger;
      return merge({}, state, {user: action.payload.user, buddy: action.payload.buddy});
    default:
      return state;
  }
};

export default taskReducer;