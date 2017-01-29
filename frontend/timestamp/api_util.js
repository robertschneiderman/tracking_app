import axios from 'axios';

const ROOT_URL = (process.env.NODE_ENV !== "production") ? 'http://localhost:3090' : 'https://trackyy.herokuapp.com';
// const ROOT_URL = 'https://trackyy.herokuapp.com';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const createTimestamp = (data, success) => {
  debugger;
  axios.post(`${ROOT_URL}/tasks/${data.newTaskId}/timestamps/`, data)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const deleteTimestamp = (data, success) => {
  debugger;
  axios.delete(`${ROOT_URL}/tasks/${data.originalTaskId}/timestamps/${data.timestamp._id}`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const finishTimestamp = (taskId, success) => {
  axios.patch(`${ROOT_URL}/timestamp/`, {taskId})
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const editTimestamp = (data, success) => {
  axios.patch(`${ROOT_URL}/tasks/${data.originalTaskId}/timestamp/${data.timestamp._id}`, data)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};