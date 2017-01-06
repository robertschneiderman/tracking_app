import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {};

const goalsReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_GOALS':
            return action.payload;
        case 'RECEIVE_UPDATED_GOALS':
        // debugger;
            action.payload.forEach(goal => {
                newState[goal._id] = goal;
            });
            return newState;
        default:
            return state;
    }
};

export default goalsReducer;