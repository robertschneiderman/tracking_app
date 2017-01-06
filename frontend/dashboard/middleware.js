import * as API from './api_util';
import * as actions from './actions';
import {router, hashHistory} from 'react-router';

const dashboardMiddleware = ({dispatch}) => next => action => {

    const success = res => {
    dispatch(actions.receive(res.data));
    };
    switch (action.type) {
        case 'action':
            API.get(action.payload, success);
            return next(action);
            break;
        default:
            return next(action);
            break;
    }
};

export default dashboardMiddleware;