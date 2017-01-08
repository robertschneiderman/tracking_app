export const createTimestamp = (taskId) => ({
  type: "CREATE_TIMESTAMP",
  payload: taskId
});