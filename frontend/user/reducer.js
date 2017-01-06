import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

// let defaultState = {currentUser: {email: '', name: ''}, buddy: null};

const userReducer = (state = {}, action) => {

  switch (action.type) {
    case "RECEIVE_USERS":
      return merge({}, action.payload);
    case "RECEIVE_USER":
      return merge({}, state, {currentUser: action.payload.user, buddy: action.payload.user.buddy});
    default:
      return state;
  }
};

export default userReducer;