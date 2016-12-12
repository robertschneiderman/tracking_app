import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    name: '',
    type: null,
    interval: null,
    time: {
        daily: 15,
        weekly: 84,
        monthly: 371
    },
    frequency: {
        daily: 1,
        weekly: 5,
        monthly: 22
    }     
};

const newtaskReducer = (state = defaultState, action) => {
    let newState;
  switch (action.type) {
    case "UPDATE_NAME":
        newState = merge({}, state);
        newState.name = action.payload;
        return newState;
    case "TASK_OPTION_CHANGE":
        newState = merge({}, state);
        newState[action.payload.btnGroup] = action.payload.value;
        return newState;
    case "UPDATE_GOALS":
        newState = merge({}, state);
        newState[newState.type] = action.payload;
        return newState;
    default:
      return state;
  }
};

export default newtaskReducer;