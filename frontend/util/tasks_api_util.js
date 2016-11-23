import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export const createTask = ({name, description }) => {
  axios.post(
    `${ROOT_URL}/tasks`,
    { name, description },
    { 
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token')
      }
    }
  ).then(data => {
  });
};