import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const createTask = (task, success) => {
  axios.post(`${ROOT_URL}/tasks`, task)
  .then(success);
};

export const getTasks = (success) => {
  axios.get(`${ROOT_URL}/tasks`)
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};

export const incrementGoal = (taskId, increment, success) => {
  console.log("increment:", increment);
  axios.patch(`${ROOT_URL}/goals/${taskId}`, {increment})
  .then(success)
  .catch(function (error) {
    console.log(error);
  });
};