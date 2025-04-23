// src/services/api.ts
import { Platform } from 'react-native';
import axios from 'axios';
import { getToken } from './authService';

// URLs de desenvolvimento - apenas para testes locais
const DEV_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'    // Emulador Android
  : 'http://localhost:3000';  // iOS Simulator / Expo na web

// URL de produção (API pública na internet)
const PROD_URL = 'https://foodbridge-api.fly.dev';

// Forçar o uso da URL de produção
const API_URL = PROD_URL;

// Log em desenvolvimento
if (__DEV__) {
  console.log('🔗 [API CONFIG] URL =', API_URL);
  console.log('📱 [API CONFIG] Platform =', Platform.OS);
}

// Criar a instância do Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar o token de autenticação às requisições
api.interceptors.request.use(
  async config => {
    // Log simplificado apenas em desenvolvimento
    if (__DEV__) {
      console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    // Adiciona o token de autenticação, se disponível
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor de resposta para log apenas em desenvolvimento
if (__DEV__) {
  api.interceptors.response.use(
    response => {
      console.log(`✅ [API] ${response.status} ${response.config.url}`);
      return response;
    },
    error => {
      if (error.response) {
        console.warn(`❌ [API] Erro ${error.response.status} para ${error.config.url}`);
      } else if (error.request) {
        console.warn(`❌ [API] Sem resposta para ${error.config.url}`);
      } else {
        console.error(`❌ [API] Erro na requisição:`, error.message);
      }
      return Promise.reject(error);
    }
  );
}

export { API_URL };
export default api;
