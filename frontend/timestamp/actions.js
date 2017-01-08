export const createTimestamp = (taskId, timeStamp) => ({
  type: "CREATE_TIMESTAMP",
  payload: { taskId, timeStamp }
});