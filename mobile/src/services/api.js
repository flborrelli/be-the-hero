import axios from 'axios';
const localIP = 'http://192.168.68.116:5000';
const apiURL = 'https://be-the-hero-full-app.herokuapp.com';


const api = axios.create({
  baseURL: apiURL || localIP
});

export default api;