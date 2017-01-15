import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {}, action) => {

  switch (action.type) {

    case "RECEIVE_TASKS":
      return action.payload;
    case "RECEIVE_TASK":
      // let modifiedTaskIndex;
      // for (var i = 0; i < state.currentUser.length; i++) {
      //   let task = state.currentUser[i];
      //   if (task._id === action.payload.task._id) modifiedTaskIndex = i;
      // }
      let newState = merge({}, state);
      newState[action.payload._id] = action.payload;
      console.log('newState: ', newState);
      return newState;      
    default:
      return state;
  }
};

export default taskReducer;