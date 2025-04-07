// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL, // Usa a variável de ambiente
  headers: {
    'Content-Type': 'multipart/form-data', // Para upload de arquivos
  },
});

// Token de autenticação, se necessário
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const analyzeImage = (formData: FormData) => api.post('analyze/', formData);