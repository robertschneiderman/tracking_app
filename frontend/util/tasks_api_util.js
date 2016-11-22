import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export const createTask = ({name, description }) => {
  axios.post(`${ROOT_URL}/tasks`, { name, description }).then(data => {
    console.log("success!");
  });
};