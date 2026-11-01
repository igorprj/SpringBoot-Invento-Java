import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o Token JWT automaticamente em todas as requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('invento_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
