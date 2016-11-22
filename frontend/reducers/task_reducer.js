import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {}, action) => {

  switch (action.type) {

    case "RECEIVE_TASK":
      return merge({}, state, NEWSTATE);

    default:
      return state;

  }
};

export default taskReducer;