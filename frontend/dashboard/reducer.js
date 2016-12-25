import React, {Component} from 'react';
import merge from 'lodash/merge';
import {router, hashHistory} from 'react-router';

let defaultState = {};

// const dashboardReducer = (state = defaultState, action) => {
//     let newState;
//     switch (action.type) {
//         case 'ALTERNATE_HISTORIES':
//             newState.index += action.payload;
//             return newState;
//         default:
//             return state;
//     }
// };

// export default dashboardReducer;