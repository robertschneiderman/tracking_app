import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export const createTask = (task) => {
  axios.post(
    `${ROOT_URL}/tasks`,
    task,
    { 
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    }
  ).then(data => {
  });
};