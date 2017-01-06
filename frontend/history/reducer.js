import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let initialState = {
    index: 0,
    date: '',
    histories: [{date: '', tasks: []}],
    loading: true
};

const historyReducer = (state = initialState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            return action.payload;
        case 'RECEIVE_HISTORY':
            // let newHistory =[action.payload.task].concat(state.histories[0].tasks);
            newState.userHistories[0] = {date: action.payload.date, tasks: [action.payload.task].concat(state.userHistories[0].tasks)};
            return newState;
        case 'ALTERNATE_HISTORIES':
            newState.index += action.payload;
            newState.date = newState.userHistories[newState.index].date;
            return newState;  
        case 'UPDATE_HISTORY':
            newState.userHistories[0] = action.payload;
            return newState;
        default:
            return state;
    }
};

// history: {
//     histories: []
//     date: date
// }

export default historyReducer;