import axios from 'axios';
const localUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: 'https://be-the-hero-full-app.herokuapp.com',
})

export default api;