import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const createTask = (task) => {
  axios.post(`${ROOT_URL}/tasks`, task)
  .then(data => {
  });
};

export const getTasks = () => {
  axios.get(`${ROOT_URL}/tasks`)
  .then(data => {
  })
  .catch(function (error) {
    console.log(error);
  });
};