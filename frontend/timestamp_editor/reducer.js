import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    task: {},
    start: {},
    end: {}
};

const TimestampReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'STORE_DATA_WITH_INDECES':
            let {dataWithIndeces} = action.payload;
            newState[action.payload.field] = dataWithIndeces;
            return newState;
        case 'CHANGE_VALUE':
            let {incrementer, value} = action.payload;

            newState[action.payload.field][incrementer] = value;
            return newState;            
        default:
            return state;
    }
};

export default TimestampReducer;