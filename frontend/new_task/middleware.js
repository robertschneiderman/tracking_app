import * as API from './api_util';
import * as ACTIONS from './actions';
import { receiveTask } from '../task/actions';
import { updateHistory } from '../history/actions';
import {router, hashHistory} from 'react-router';

const taskMiddleware = store => next => action => {     

  switch (action.type) {

    // case "CREATE_TASK":
    //   API.createTask(action.payload, createSuccess);
    //   return next(action);      
    default:
      return next(action);
  }
};   

export default taskMiddleware;