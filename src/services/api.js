import axios from 'axios';

const API = axios.create({
  baseURL: 'https://to-do-b.onrender.com/api', // <-- Point directly to your live backend
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
