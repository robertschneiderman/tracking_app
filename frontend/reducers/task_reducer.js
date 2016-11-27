import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const taskReducer = (state = {currentUser: [], buddy: []}, action) => {

  switch (action.type) {

    case "RECEIVE_TASKS":
      return merge({}, state, {currentUser: action.payload.user, buddy: action.payload.buddy});
    case "RECEIVE_TASK":
      let modifiedTaskIndex;
      for (var i = 0; i < state.currentUser.length; i++) {
        let task = state.currentUser[i];
        if (task.id === action.payload.task.id) modifiedTaskIndex = i;
      }

      let newArr = merge([], state.currentUser);
      newArr[modifiedTaskIndex] = action.payload.task

      return merge({}, state, {currentUser: newArr} );      
    default:
      return state;
  }
};

export default taskReducer;