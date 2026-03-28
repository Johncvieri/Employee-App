import axios from "axios";

const token = btoa("admin:admin123");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Terjadi kesalahan pada server";
    return Promise.reject(new Error(message));
  }
);

export default api;