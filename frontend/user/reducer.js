import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const userReducer = (state = {currentUser: {email: '', name: ''}, buddy: null}, action) => {

  switch (action.type) {

    case "RECEIVE_USER":
      return merge({}, state, {currentUser: action.payload.user, buddy: action.payload.user.buddy});
    default:
      return state;
  }
};

export default userReducer;