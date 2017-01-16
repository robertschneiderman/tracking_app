import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {};

const timestampReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        case 'RECEIVE_TIMESTAMPS':

            return merge(state, action.payload);
        default:
            return state;
    }
};

export default timestampReducer;