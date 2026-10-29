import axios from 'axios';
const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_URL });

apiClient.interceptors.request.use((config) => {
  const dummyToken = localStorage.getItem('purpy_token') || 'dummy-purpy-token-123';
  if (config.headers.Authorization || true) { // true - kabatti - always accept
    config.headers.Authorization = `Bearer ${dummyToken}`;
  }
  return config;
});

// FUTURE REAL CODE - COMMENT LO SAVE
export default apiClient;