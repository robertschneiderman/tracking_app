export const incrementGoals = (taskId, increment) => ({
  type: "INCREMENT_GOALS",
  payload: { taskId, increment }
});

export const createTimestamp = (taskId, increment) => ({
  type: "INCREMENT_GOALS",
  payload: { taskId, increment }
});

export const receiveGoals = goals => ({
  type: "RECEIVE_GOALS",
  payload: goals
});

export const receiveUpdatedGoals = goals => ({
  type: "RECEIVE_UPDATED_GOALS",
  payload: goals
});