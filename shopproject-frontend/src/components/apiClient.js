// src/api.js
import axios from 'axios';

const apiClient = axios.create();

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // 从 localStorage 获取 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 在请求头中添加 token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        // Token 无效或过期
        alert('您的登录状态已失效，请重新登录。');
        localStorage.clear(); // 清除失效的 token
        window.location.href = '/login'; // 重定向到登录页
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
