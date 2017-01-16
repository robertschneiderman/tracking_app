import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {}, action) => {

  switch (action.type) {

    case "RECEIVE_TASKS":
      return action.payload;
    case "RECEIVE_TASK":
      return Object.assign({}, state, {[action.payload._id]: action.payload});
    default:
      return state;
  }
};

export default taskReducer;