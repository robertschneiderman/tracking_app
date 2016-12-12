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

const historyReducer = (state = {histories: [ { date: '', tasks: []} ]}, action) => {
    let newState;
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            newState = merge({}, state);
            newState.histories = action.payload.histories.concat(state.histories);
            newState.index = newState.histories.length;
            let date = newState.histories[0].date;
            debugger;
            newState.date = formattedDate(date);
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