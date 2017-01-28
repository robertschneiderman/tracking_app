export const storeDataWithIndeces = payload => ({
    type: 'STORE_DATA_WITH_INDECES',
    payload
});

export const changeTaskValue = payload => ({
    type: 'CHANGE_TASK_VALUE',
    payload
});

export const changeTimestampValue = payload => ({
    type: 'CHANGE_TIMESTAMP_VALUE',
    payload
});

export const editTimestamp = payload => {
    return (dispatch) => {
        debugger;
        if (payload.newTaskId) {
            dispatch({type: 'DELETE_TIMESTAMP', payload: payload});
            dispatch({type: 'CREATE_TIMESTAMP', payload: payload});
        }
        dispatch({type: 'EDIT_TIMESTAMP', payload: payload});
    };
};