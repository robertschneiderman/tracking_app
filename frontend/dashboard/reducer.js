import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    index: 0,
    date: new Date(),
    loading: true
};

const dashboardReducer = (state = defaultState, action) => {
    let newState = {};
    switch (action.type) {
        case 'STOP_LOADING':
            newState.loading = false;
            return newState;
        case 'ALTERNATE_HISTORIES':
            let index = state.index + action.payload;
            return merge({}, state, {index});
        default:
            return state;
    }
};

export default dashboardReducer;