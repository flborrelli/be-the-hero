import axios from 'axios';
const localUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: localUrl || process.env.REACT_APP_API_URL,
})

export default api;