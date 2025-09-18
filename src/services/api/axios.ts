// src/services/api/axios.ts
import axios from 'axios';

// ✅ INI YANG BENAR — ambil dari environment variable Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Jika tidak ada, fallback ke localhost (hanya untuk dev)
const baseURL = API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

export default api;