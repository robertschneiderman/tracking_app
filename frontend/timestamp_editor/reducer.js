import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    originalTaskId: undefined,
    newTaskId: undefined,
    timestamp: {
        _id: '',
        start: '',
        end: ''
    }
};

const TimestampReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'STORE_DATA_WITH_INDECES':
            let {dataWithIndeces} = action.payload;
            newState[action.payload.field] = dataWithIndeces;
            return newState;
        case 'CHANGE_TIMESTAMP_VALUE':
            newState.timestamp[action.payload.field] = action.payload.result;
            return newState;     
        case 'CHANGE_TASK_VALUE':
            newState[action.payload.field] = action.payload.result;
            return newState;                      
        case 'POPULATE_TIMESTAMP_EDITOR':
            return action.payload;
        default:
            return state;
    }
};

export default TimestampReducer;