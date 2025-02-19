// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api', // Replace with your backend URL
  timeout: 5000,
});

api.interceptors.request.use(
  config => {
    // Attach token if available
    return config;
  },
  error => Promise.reject(error)
);

export default api;
