import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {
    userHistories: [],
    buddyHistories: [],
    userTasks: [],
    buddyTasks: []
};

const entitiesReducer = (state = defaultState, action) => {
    let newState = merge({}, state);    
    if (action.entities) {    
        // newState
        // debugger;
        return action.entities.entities;
    }
    return state;
};

export default entitiesReducer;