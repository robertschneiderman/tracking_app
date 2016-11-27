import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const userReducer = (state = {current: {email: ''}, buddy: {email: ''}}, action) => {

  switch (action.type) {

    case "RECEIVE_USER":
      return merge({}, state, {current: action.payload.user, buddy: action.payload.buddy});
    default:
      return state;
  }
};

export default userReducer;