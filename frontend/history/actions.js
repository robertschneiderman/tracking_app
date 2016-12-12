export const requestHistories = payload => ({
    type: 'REQUEST_HISTORIES',
    payload
});

export const receiveHistories = payload => ({
    type: 'RECEIVE_HISTORIES',
    payload
});

export const receiveHistory = payload => ({
    type: 'RECEIVE_HISTORY',
    payload
});

export const updateHistory = payload => ({
    type: 'UPDATE_HISTORY',
    payload
});