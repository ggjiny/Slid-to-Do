import axios from 'axios';

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default authInstance;
