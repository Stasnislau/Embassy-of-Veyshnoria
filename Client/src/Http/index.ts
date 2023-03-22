import { AuthResponseInterface } from "../../../Client/src/Interfaces/";
import axios from "axios";

export const API_URL = "http://localhost:3001";
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const response = await axios.get<AuthResponseInterface>(
          `${process.env.API_URL}/users/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        return api.request(originalRequest);
      } catch (error: any) {}
    }
    throw error;
  }
);

export default api;
