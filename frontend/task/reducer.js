import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = [], action) => {
  let newState = merge([], state);
  switch (action.type) {

    case "RECEIVE_TASKS":
      return (action.payload) ? action.payload : {};
    case "RECEIVE_TASK":
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default taskReducer;