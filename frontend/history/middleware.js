import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';
import { arrayOf, normalize, Schema } from 'normalizr';
// import { userHistorySchema, buddyHistorySchema, taskSchema, goalSchema } from '../constants/schemas';

const userSchema = new Schema('users', { idAttribute: '_id' });
const historySchema = new Schema('histories', { idAttribute: '_id' });
// const buddyHistorySchema = new Schema('buddyHistories', { idAttribute: '_id' });
const taskSchema = new Schema('tasks', { idAttribute: '_id' });
const goalSchema = new Schema('goals', { idAttribute: '_id' });

userSchema.define({
  histories: arrayOf(historySchema),
});

historySchema.define({
  tasks: arrayOf(taskSchema),
});

taskSchema.define({
    goals: arrayOf(goalSchema)
});


const historyMiddleware = ({dispatch}) => next => action => {

    const getSuccess = res => {
        const normalized = normalize(res.data, {
            users: arrayOf(userSchema),
            histories: arrayOf(historySchema),
            tasks: arrayOf(taskSchema),
            goals: arrayOf(goalSchema)
        }); 
        // dispatch({type: 'RECEIVE_GOALS', payload: normalized.entities.goals });
        // dispatch({type: 'RECEIVE_TASKS', payload: normalized.entities.tasks });
        // dispatch({type: 'RECEIVE_HISTORIES', payload: normalized.entities.histories });
        dispatch({type: 'RECEIVE_USERS', payload: normalized.entities });
    };

    const createSuccess = res => {
        dispatch(actions.receiveHistory(res.data));
    };

    switch (action.type) {
        case 'REQUEST_HISTORIES':
            API.getHistories(action.payload, getSuccess);        
            return next(action);
            break;
        case 'CREATE_BLANK_HISTORY':
            API.createHistory(createSuccess);
            return next(action);
            break;            
        default:
            return next(action);
            break;
    }
};

export default historyMiddleware;