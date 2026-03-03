import axios from 'axios';

export const myAxios = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  }
});


axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';