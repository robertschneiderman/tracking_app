import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const historyMiddleware = ({dispatch}) => next => action => {

    const getSuccess = res => {
        dispatch(actions.receiveHistories(res.data));
    };

    switch (action.type) {
        case 'REQUEST_HISTORIES':
            API.getHistories(action.payload, getSuccess);        
            return next(action);
            break;
        default:
            return next(action);
            break;
    }
};

export default historyMiddleware;