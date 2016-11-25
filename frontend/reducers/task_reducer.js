import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {tasks: []}, action) => {

  switch (action.type) {

    case "RECEIVE_TASKS":
      // debugger;
      return merge({}, state, {tasks: action.payload});
    default:
      return state;
  }
};

export default taskReducer;