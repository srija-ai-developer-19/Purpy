import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/api" });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Dummy Auth - Any ID Accept - For Now
api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer dummy-purpy-token-123`;
  }
  return config;
});
export default api;