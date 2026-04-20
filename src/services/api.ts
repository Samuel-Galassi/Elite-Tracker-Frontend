import axios from 'axios';
import { userLocalStorageKey } from '../hooks/use-user';

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem(userLocalStorageKey);

  if (userData) {
    const { token } = JSON.parse(userData);

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
