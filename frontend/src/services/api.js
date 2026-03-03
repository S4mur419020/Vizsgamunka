import axios from "axios";

export const myAxios = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, 
});


myAxios.interceptors.request.use(config => {
    const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
    }
    return config;
});