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
        // debugger;
        let newPayload = {taskId: payload.originalTaskId, timestampId: payload.timestamp._id};

        if (payload.newTaskId) {
            dispatch({type: 'DELETE_TIMESTAMP', payload: newPayload});
            newPayload.taskId = payload.newTaskId;
            newPayload.start = payload.timestamp.start;
            newPayload.end = payload.timestamp.end;
            dispatch({type: 'CREATE_TIMESTAMP', payload: newPayload});
        }
        dispatch({type: 'EDIT_TIMESTAMP', payload: newPayload});
    };
};