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
        // dispatch(actions.receiveHistories(res.data));
        dispatch({type: 'data', data: normalized});    
        dispatch({type: 'STOP_LOADING'});    
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