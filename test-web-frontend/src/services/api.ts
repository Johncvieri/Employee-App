import axios from 'axios';

const token = btoa('admin:admin123'); 

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  },
});

export default api;