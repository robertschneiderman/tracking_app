import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const historyReducer = (state = {index: 0, histories: [ { date: '', tasks: []} ]}, action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            let tempVar = (state.histories[0].date === '') ? [] : state.histories;
            newState.histories = tempVar.concat(action.payload.histories);
            let date = newState.histories[0].date;
            newState.date = date;
            return newState;
        case 'RECEIVE_HISTORY':
            // let newHistory =[action.payload.task].concat(state.histories[0].tasks);
            newState.histories[0] = {date: action.payload.date, tasks: [action.payload.task].concat(state.histories[0].tasks)};
            return newState;
        case 'ALTERNATE_HISTORIES':
            newState.index = state.index + action.payload;
            return newState;  
        case 'UPDATE_HISTORY':
            newState.histories[0] = action.payload;
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