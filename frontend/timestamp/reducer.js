import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = [];

const timestampReducer = (state = defaultState, action) => {
    let newState = merge([], state);
    switch (action.type) {
        case 'RECEIVE_TIMESTAMPS':
            return merge(state, action.payload);
        case 'RECEIVE_TIMESTAMP':
            newState.push(action.payload);
            return newState;
        default:
            return state;
    }
};

export default timestampReducer;