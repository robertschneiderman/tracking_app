import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const goalMiddleware = ({dispatch}) => next => action => {

    const incrementSuccess = res => {
        let goal = res.data;
        dispatch(actions.receiveUpdatedGoals(goal));
    };   

    switch (action.type) {
        case "INCREMENT_GOALS":
            API.incrementGoals(action.payload.taskId, action.payload.increment, incrementSuccess);
            return next(action);      
        default:
            return next(action);
    }
};

export default goalMiddleware;