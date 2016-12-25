import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let initialState = {
    index: 0,
    date: '',
    userHistories: [{date: '', tasks: []}],
    buddyHistories: [{date: '', tasks: []}],
    loading: false
};

const historyReducer = (state = initialState, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            let prevUHistories = (state.userHistories[0].date) === '' ? [] : state.userHistories;
            let prevBHistories = (state.buddyHistories[0].date) === '' ? [] : state.buddyHistories;

            newState.userHistories = prevUHistories.concat(action.payload.userHistories);
            newState.buddyHistories = prevBHistories.concat(action.payload.buddyHistories);
            newState.date = newState.userHistories[newState.index].date;
            // }
            return newState;
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
        case 'STOP_LOADING':
            newState.loading = true;
        default:
            return state;
    }
};

// history: {
//     histories: []
//     date: date
// }

export default historyReducer;