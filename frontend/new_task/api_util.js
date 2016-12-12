import axios from 'axios';

const ROOT_URL = (process.env.NODE_ENV !== "production") ? 'http://localhost:3090' : 'https://trackyy.herokuapp.com';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const createTask = (task, success) => {
  axios.post(`${ROOT_URL}/tasks`, task)
  .then(success);
};