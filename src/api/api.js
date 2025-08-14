import axios from "axios";

const BASE_URL = "https://snow-mosquito-696198.hostingersite.com/api";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlwy94hlr/video/upload";
const CLOUDINARY_PRESET = "react_gallery";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Automatically catch token expiry and redirect
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login"; // or use navigation
    }
    return Promise.reject(error);
  }
);

const api = {
  axios: axiosInstance,
  BASE_URL,
  CLOUDINARY_URL,
  CLOUDINARY_PRESET,
};

export default api;
