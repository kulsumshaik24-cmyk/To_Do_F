import axios from 'axios';

const API = axios.create({
  baseURL: 'https://to-do-b.onrender.com/api',
});

// Attach JWT token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // or wherever you store your JWT token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
