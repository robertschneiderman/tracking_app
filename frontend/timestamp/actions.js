export const createTimestamp = (taskId) => ({
  type: "CREATE_TIMESTAMP",
  payload: taskId
});

export const finishTimestamp = (taskId) => ({
  type: "FINISH_TIMESTAMP",
  payload: taskId
});

export const receiveTimestamp = (taskId) => ({
  type: "RECEIVE_TIMESTAMP",
  payload: taskId
});