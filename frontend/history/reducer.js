import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

const historyReducer = (state = {index: 0, date: '', userHistories: [], buddyHistories: []},  action) => {
    let newState = merge({}, state);
    switch (action.type) {
        case 'RECEIVE_HISTORIES':
            let tempVar = (state.userHistories === []) ? [] : state.userHistories;
            newState.userHistories = tempVar.concat(action.payload.userHistories);
            newState.date = newState.userHistories[0].date;
            

            let tempVar2 = (state.buddyHistories === []) ? [] : state.buddyHistories;
            newState.buddyHistories = tempVar2.concat(action.payload.buddyHistories);
            newState.date = newState.buddyHistories[0].date;
            return newState;

            // return {
            //     index: state.index,
            //     date: action.payload.userHistories[0].date,
            //     userTasks: [
            //         ...action.payload.userHistories[0].tasks,
            //         ...state.userHistories
            //     ],
            //     buddyTasks: [
            //         ...action.payload.buddyHistories[0].tasks,
            //         ...state.buddyHistories
            //     ]              
            // };
        case 'RECEIVE_HISTORY':
            // let newHistory =[action.payload.task].concat(state.histories[0].tasks);
            newState.userHistories[0] = {date: action.payload.date, tasks: [action.payload.task].concat(state.userHistories[0].tasks)};
            return newState;
        case 'ALTERNATE_HISTORIES':
            newState.index = state.index + action.payload;
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