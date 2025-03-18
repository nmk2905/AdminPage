// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://platform-family.onrender.com', // Thay bằng URL API thật của bạn
});

// Thêm interceptor nếu dùng token authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;
