import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {users: []};

const dataReducer = (state = defaultState, action) => {
    let newState = merge({}, state);    
    if (action.data) {    
        return merge({}, state, action.data);
    }
    return state;
};

export default dataReducer;