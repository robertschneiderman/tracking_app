import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';
import { arrayOf, normalize, Schema } from 'normalizr';
// import { receiveDashboardData } from '../dashboard/actions';
// import { userHistorySchema, buddyHistorySchema, taskSchema, goalSchema } from '../constants/schemas';

// const userSchema = new Schema('users', { idAttribute: '_id' });
// const historySchema = new Schema('histories', { idAttribute: '_id' });
// const taskSchema = new Schema('tasks', { idAttribute: '_id' });
// const goalSchema = new Schema('goals', { idAttribute: '_id' });

// userSchema.define({
//   histories: arrayOf(historySchema),
// });

// historySchema.define({
//   tasks: arrayOf(taskSchema),
// });

// taskSchema.define({
//     goals: arrayOf(goalSchema)
// });


const historyMiddleware = ({dispatch}) => next => action => {

    const createSuccess = res => {
        dispatch(actions.receiveHistory(res.data));
    };

    switch (action.type) {
        case 'REQUEST_HISTORIES':
            // API.getHistories(action.payload, getSuccess);        
            // return next(action);
            break;
        case 'CREATE_BLANK_HISTORY':
            API.createHistory(createSuccess);
            return next(action);
        default:
            return next(action);
    }
};

export default historyMiddleware;