import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

const token = useLocalStorage("access_token", null);

// Base URL API
const api = axios.create({
  baseURL: "/api",
  headers: {
    "apikey": import.meta.env.VITE_SUPABASE_PUBLIC_API_KEY,
  },
});

// Tambahkan Interceptor untuk Request
api.interceptors.request.use(
  (config) => {

    if (token.value) {
      // config.headers["apikey"] = token;
      config.headers.Authorization = `Bearer ${token.value}`;
      config.headers.Prefer = "return=minimal";
    }
    
     if (config.data instanceof FormData) {
      delete config.headers?.["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Tambahkan Interceptor untuk Response
api.interceptors.response.use(
  (response) => response, // Jika response sukses, langsung dikembalikan
  async (error) => {
    if(error.response && error.response.status === 401) {
      // Handle Unauthorized Error (401)
      if (token.value) {
        token.value = null;
      }
      window.location.href = "/login";
    }
      
    return Promise.reject(error);
  }
);

export default api;
