import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    originalTaskId: undefined,
    newTaskId: undefined,
    timestampId: undefined,
    timestamp: {
        task: '',
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
        case 'CHANGE_VALUE':
            let {result} = action.payload;

            newState[action.payload.field] = result;
            return newState;           
        case 'POPULATE_TIMESTAMP_EDITOR':
            return action.payload;
        default:
            return state;
    }
};

export default TimestampReducer;