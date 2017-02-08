import * as API from './api_util';
import * as ACTIONS from './actions';
import {router, hashHistory} from 'react-router';
import { arrayOf, normalize, Schema } from 'normalizr';
import { receiveDashboardData, receiveEntities } from '../dashboard/actions';
import {userSchema, historySchema, taskSchema, goalSchema, timestampSchema} from './schemas';

// userSchema.define({
//   histories: arrayOf(historySchema),
// });

// historySchema.define({
//   tasks: arrayOf(taskSchema),
// });

// taskSchema.define({
//     goals: arrayOf(goalSchema),
//     timestamps: arrayOf(timestampSchema)
// });

const userMiddleware = store => next => action => {

  let dispatch = store.dispatch;

  const getSuccess = res => {
    // const normalized = normalize(res.data.users, [userSchema]);
    // const normalized = normalize(res.data, {
    //   users: arrayOf(userSchema),
    //   histories: arrayOf(historySchema),
    //   tasks: arrayOf(taskSchema),
    //   goals: arrayOf(goalSchema),
    //   timestamps: arrayOf(timestampSchema)
    // });

    // dispatch(receiveEntities(normalized.entities));
      
    receiveDashboardData(res.data.users)(dispatch);
    // receiveDashboardData(normalized.entities)(dispatch);
  }; 

  switch (action.type) {

    case "REQUEST_USER":
      API.getUser(action.payload, getSuccess);
      return next(action);      
    default:
      return next(action);
  }
};   

export default userMiddleware;