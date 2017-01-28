export const storeDataWithIndeces = payload => ({
    type: 'STORE_DATA_WITH_INDECES',
    payload
});

export const changeValue = payload => ({
    type: 'CHANGE_VALUE',
    payload
});

export const editTimestamp = payload => {
    return (dispatch) => {
        if (payload.newTaskId) {
            dispatch({type: 'DELETE_TIMESTAMP', payload: payload.originalTaskId});
        }
        dispatch({type: 'EDIT_TIMESTAMP', payload: payload});
    };
};