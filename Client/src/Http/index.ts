import axios from "axios";

const baseURL = "http://localhost:3001";
const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

export default api;
