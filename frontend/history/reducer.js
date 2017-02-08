import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';
import formatDate from './helpers';

let initialState = {};

const historyReducer = (state = initialState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            return (action.payload) ? action.payload : {};
        case 'RECEIVE_HISTORY':
            // let newHistory =[action.payload.task].concat(state.histories[0].tasks);
            return {[action.payload._id]: action.payload};
        default:
            return state;
    }
};

// history: {
//     histories: []
//     date: date
// }

export default historyReducer;