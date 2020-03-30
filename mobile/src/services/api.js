import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-the-hero-full-app.herokuapp.com'
});

export default api;