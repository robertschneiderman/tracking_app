export const getTasks = () => ({
  type: "GET_TASKS",
});

export const incrementGoal = (taskId, count) => ({
  type: "INCREMENT_GOAL",
  payload: { taskId, count }
})