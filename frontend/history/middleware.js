import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';
import { arrayOf, normalize, Schema } from 'normalizr';
// import { userHistorySchema, buddyHistorySchema, taskSchema, goalSchema } from '../constants/schemas';

const userHistorySchema = new Schema('userHistories', { idAttribute: '_id' });
const buddyHistorySchema = new Schema('buddyHistories', { idAttribute: '_id' });
const taskSchema = new Schema('tasks', { idAttribute: '_id' });
const goalSchema = new Schema('goals', { idAttribute: '_id' });

userHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

buddyHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

taskSchema.define({
    goals: arrayOf(goalSchema)
});


const historyMiddleware = ({dispatch}) => next => action => {

    const getSuccess = res => {
        const normalized = normalize(res.data, {
            userHistories: arrayOf(userHistorySchema),
            buddyHistories: arrayOf(buddyHistorySchema),
            tasks: arrayOf(taskSchema),
            goals: arrayOf(goalSchema)
        });        
        dispatch(actions.receiveHistories(res.data));
        dispatch({type: 'entities', entities: normalized});        
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