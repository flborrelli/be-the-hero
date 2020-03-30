import axios from 'axios';
const localIP = 'http://201.92.249.232:5000';
const appURL = 'https://be-the-hero-full-app.herokuapp.com';


const api = axios.create({
  baseURL: appURL || localIP
});

export default api;