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

    case "TASK_OPTION_CHANGE":
        newState = merge({}, state);
        newState[action.payload.btnGroup] = action.payload.value;
        return newState;
    case "INCREMENT_GOAL":
        newState = merge({}, state);
        newState[newState.goalType][state.interval] += 1;
        return newState;
     
    default:
      return state;
  }
};

export default newtaskReducer;