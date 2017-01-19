import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = { loading: false, weekIdx: 0 };

const calendarReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {
        // case 'UPDATE_NAME':
        //     return newState;
        default:
            return state;
    }
};

export default calendarReducer;