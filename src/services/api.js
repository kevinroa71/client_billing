import axios from "axios";

const api = axios.create({
    baseURL: process.env.REST_URL || 'http://localhost:8000/',
    timeout: 15000
});

api.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = 'Bearer '+token;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;
