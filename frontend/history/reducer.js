import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const numberEndings = {
    1: 'st',
    2: 'nd',
    3: 'rd',
};

const formattedDate = date => {
    let month = months[date.getMonth()];
    let day = date.getDate();
    let ending = (day > 3) ? 'th' : numberEndings[day];
    let dayStrFull = `${day.toString()}${ending}`;
    return `${month} ${dayStrFull} ${date.getFullYear()}`;
};

const historyReducer = (state = {index: 0, histories: [ { date: '', tasks: []} ]}, action) => {
    let newState;
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            newState = merge({}, state);
            newState.histories = action.payload.histories.concat(state.histories);
            newState.index = 0;
            let date = newState.histories[0].date;
            newState.date = date;
            return newState;
        case 'RECEIVE_HISTORY':
            newState = merge({}, state);
            // let newHistory =[action.payload.task].concat(state.histories[0].tasks);
            newState.histories[0] = {tasks: [action.payload.task].concat(state.histories[0].tasks)};
            return newState;
        case 'ALTERNATE_HISTORIES':
            newState = merge({}, state);
            newState.index = state.index + action.payload;   
            return newState;  
        case 'UPDATE_HISTORY':
            newState = merge({}, state);
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