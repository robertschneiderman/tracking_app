export const createTask = info => ({
  type: "CREATE_TASK",
  payload: info
});

export const requestTasks = () => ({
  type: "REQUEST_TASKS",
});

export const receiveTasks = tasks => ({
  type: "RECEIVE_TASKS",
  payload: tasks
});

export const incrementGoal = (taskId, count) => ({
  type: "INCREMENT_GOAL",
  payload: { taskId, count }
});