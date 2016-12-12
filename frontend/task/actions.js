export const requestTasks = () => ({
  type: "REQUEST_TASKS",
});

export const receiveTasks = tasks => ({
  type: "RECEIVE_TASKS",
  payload: tasks
});

export const receiveTask = task => ({
  type: "RECEIVE_TASK",
  payload: task
});

export const incrementGoal = (taskId, count) => ({
  type: "INCREMENT_GOAL",
  payload: { taskId, count }
});