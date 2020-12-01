import axios from "axios";

const api = axios.create({
    baseURL: process.env.REST_URL || 'http://localhost:8000/',
    timeout: 10000
});

export default api;
