export const requestHistories = payload => ({
    type: 'REQUEST_HISTORIES',
    payload
});

export const receiveHistories = payload => {
    // debugger;    
    // payload = normalize(payload, {
    //     userHistories: arrayOf(userHistorySchema),
    //     buddyHistories: arrayOf(buddyHistorySchema),
    //     tasks: arrayOf(taskSchema),
    //     goals: arrayOf(goalSchema)
    // });
    // debugger;

    return {
        type: 'RECEIVE_HISTORIES',
        payload
    };
};

export const receiveHistory = payload => ({
    type: 'RECEIVE_HISTORY',
    payload
});

export const updateHistory = payload => ({
    type: 'UPDATE_HISTORY',
    payload
});

export const alternateHistories = payload => ({
    type: 'ALTERNATE_HISTORIES',
    payload
});