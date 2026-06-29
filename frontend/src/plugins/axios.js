import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useNotificationStore } from "../stores/notifications";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api_v1/";

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const instance_auth = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

instance_auth.interceptors.request.use(function (config) {
  const authStore = useAuthStore();
  if (authStore.jwt) {
    config.headers.Authorization = `Bearer ${authStore.jwt}`;
  }
  return config;
});

instance_auth.interceptors.response.use(
  (response) => {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    if (response.data.refresh_token) {
      authStore.jwt = response.data.refresh_token;
      localStorage.setItem("token", response.data.refresh_token);
    }

    if (response.config.method !== 'get' && response.data.message) {
      notificationStore.create(response.data.message, true, "success");
    }

    return response.data;
  },
  (error) => {
    const authStore = useAuthStore();
    const notificationStore = useNotificationStore();

    const status = error.response?.status;
    const data = error.response?.data || {};
    const backendMessage = data.message || data.error || "";
    let tipo = "error";
    let message = backendMessage;

    if (status === 401) {
      const esExpirado = backendMessage.toLowerCase().includes("expir");
      message = esExpirado ? "Tu sesi\u00f3n expir\u00f3. Inici\u00e1 sesi\u00f3n nuevamente." : (backendMessage || "Credenciales inv\u00e1lidas.");
      notificationStore.create(message, true, "warning");
      setTimeout(() => authStore.logout(), 1500);
      return Promise.reject(error);
    }

    if (status === 403) {
      message = backendMessage || "No ten\u00e9s permiso para realizar esta acci\u00f3n.";
      notificationStore.create(message, true, "warning");
      setTimeout(() => authStore.goHome(), 1500);
      return Promise.reject(error);
    }

    if (status === 409) {
      message = backendMessage || "Conflicto: el recurso ya existe o tiene dependencias.";
      notificationStore.create(message, true, "warning");
      return Promise.reject(error);
    }

    if (status === 422) {
      message = backendMessage || "Datos inv\u00e1lidos.";
      tipo = "warning";
    }

    if (message) {
      notificationStore.create(message, true, tipo);
    }

    return Promise.reject(error);
  }
);
