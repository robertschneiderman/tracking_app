import React, {Component} from 'react';

import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';
const historyReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case 'RECEIVE_HISTORIES':

            return newState;
        default:
            return state;
    }
};

export default historyReducer;