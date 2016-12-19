import axios from 'axios';

const ROOT_URL = (process.env.NODE_ENV !== "production") ? 'http://localhost:3090' : 'https://trackyy.herokuapp.com';

axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getHistories = (index, success) => {
  axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');  
  axios.get(`${ROOT_URL}/history/${index}`)
  .then(success);
};

export const createHistory = (success) => {
  debugger;
  axios.defaults.headers.common['x-auth'] = localStorage.getItem('token');  
  axios.post(`${ROOT_URL}/history/`)
  .then(success);
};