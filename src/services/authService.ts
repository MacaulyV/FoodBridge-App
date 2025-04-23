// src/services/authService.ts
import api from './api';
import { API_URL } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData, mapApiUserToAppUser } from './userService';

// chaves para o AsyncStorage
const TOKEN_KEY = '@FoodBridge:token';
const USER_KEY  = '@FoodBridge:user';

export const storeToken = async (token: string): Promise<void> => {
  try { await AsyncStorage.setItem(TOKEN_KEY, token); }
  catch (err) { console.error('Erro ao salvar token:', err); }
};

export const getToken = async (): Promise<string | null> => {
  try { return await AsyncStorage.getItem(TOKEN_KEY); }
  catch (err) { console.error('Erro ao recuperar token:', err); return null; }
};

export const storeUser = async (user: any): Promise<void> => {
  try { 
    console.log('🔄 [AUTH] Salvando dados do usuário:', user);
    
    if (!user) {
      console.warn('⚠️ [AUTH] Tentativa de salvar usuário nulo ou indefinido');
      return;
    }
    
    // Salvar no formato antigo para compatibilidade
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('✅ [AUTH] Dados salvos no formato compatível');
    
    // Salvar no novo formato para uso nas telas de perfil
    try {
      await saveUserData(mapApiUserToAppUser(user));
      console.log('✅ [AUTH] Dados salvos no novo formato');
    } catch (mapError) {
      console.error('❌ [AUTH] Erro ao mapear/salvar no novo formato:', mapError);
    }
  }
  catch (err) { 
    console.error('❌ [AUTH] Erro ao salvar user:', err);
    console.error('❌ [AUTH] Objeto que causou o erro:', user);
  }
};

export const getUser = async (): Promise<any | null> => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error('Erro ao recuperar user:', err);
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try { await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]); }
  catch (err) { console.error('Erro ao limpar auth:', err); }
};

/**
 * Realiza o logout do usuário, limpando os dados da sessão.
 * Preserva apenas o avatar do usuário.
 */
export const logout = async (): Promise<void> => {
  try {
    console.log('🔄 [AUTH] Realizando logout do usuário...');
    
    // Limpar token de autenticação
    await AsyncStorage.removeItem(TOKEN_KEY);
    
    // Limpar dados antigos
    await AsyncStorage.removeItem(USER_KEY);
    
    // Limpar dados no formato novo (exceto avatar)
    const userData = await AsyncStorage.getItem('@FoodBridge:userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Limpa os dados do usuário, mantendo apenas o avatar
        await AsyncStorage.removeItem('@FoodBridge:userData');
        console.log('✅ [AUTH] Dados do usuário removidos (avatar preservado)');
      } catch (parseError) {
        console.error('❌ [AUTH] Erro ao processar dados de usuário durante logout:', parseError);
      }
    }
    
    // Limpar cabeçalho de autorização
    if (api.defaults.headers.common['Authorization']) {
      delete api.defaults.headers.common['Authorization'];
    }
    
    console.log('✅ [AUTH] Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ [AUTH] Erro ao realizar logout:', error);
    throw error;
  }
};

/** checa conectividade com a API */
export async function checkApiConnection(): Promise<{
  success: boolean;
  message: string;
  url?: string;
  ping?: number;
  environment: 'development' | 'production';
}> {
  const start = Date.now();
  const env = __DEV__ ? 'development' : 'production';

  console.log('📡 [API] Verificando conexão com:', API_URL);
  
  // Tentar verificar a rota específica de login primeiro
  try {
    await api.options('/users/login');
    const ping = Date.now() - start;
    console.log('✅ [API] Endpoint de login acessível');
    return { success: true, message: 'Endpoint de login acessível', url: API_URL, ping, environment: env };
  } catch (loginError: any) {
    // Se recebeu alguma resposta HTTP do endpoint de login, a API está acessível
    if (loginError.response) {
      const ping = Date.now() - start;
      console.log('✅ [API] Endpoint de login respondeu, mas com status:', loginError.response.status);
      return { 
        success: true, 
        message: `API acessível (login respondeu com ${loginError.response.status})`,
        url: API_URL, 
        ping, 
        environment: env 
      };
    }
  }
  
  // Tentar verificar outras rotas comuns
  try {
    await api.get('/health');
    const ping = Date.now() - start;
    console.log('✅ [API] API acessível via /health');
    return { success: true, message: 'API acessível (via /health)', url: API_URL, ping, environment: env };
  } catch (healthError) {
    try {
      await api.get('/');
      const ping = Date.now() - start;
      console.log('✅ [API] API acessível via raiz');
      return { success: true, message: 'API acessível (via /)', url: API_URL, ping, environment: env };
    } catch (err: any) {
      const ping = Date.now() - start;
      let msg = `Não foi possível conectar à API (${env})`;
      
      console.log('❌ [API] Falha na conexão. Detalhes:');
      
      if (err.response) {
        msg = `API retornou erro ${err.response.status} (${env})`;
        console.log('- Resposta recebida com erro:', err.response.status);
      } else if (err.request) {
        console.log('- URL tentada:', err.request._url);
        console.log('- Sem resposta do servidor');
        
        if (env === 'development') {
          msg += '\nVerifique se:\n- A API está rodando\n- A URL está correta\n- O dispositivo/emulador está na mesma rede';
          // Tentar fazer uma verificação direta do servidor via fetch para diagnóstico
          try {
            const testUrl = API_URL.replace(/\/$/, '');
            console.log('- Tentando fetch direto para:', testUrl);
            await fetch(testUrl, { method: 'HEAD' });
            console.log('  ✓ Servidor respondeu ao fetch direto');
          } catch (fetchErr) {
            console.log('  ✗ Servidor não respondeu ao fetch direto');
          }
        }
      } else {
        console.log('- Erro geral:', err.message);
      }
      
      return { success: false, message: msg, url: API_URL, environment: env };
    }
  }
}

/** faz login e já seta o header Authorization */
export async function loginUser(email: string, password: string): Promise<any> {
  try {
    // Importante: o frontend usa 'password', mas a API espera 'senha'
    const senha = password;
    
    if (__DEV__) console.log('📤 [API] Enviando login para:', email);
    
    // Faz a requisição POST para login APENAS com os campos que a API aceita
    const res = await api.post('/users/login', { 
      email, 
      senha  // Importante: Enviando como 'senha' e não 'password'
    });
    
    if (__DEV__) console.log('📥 [API] Login bem-sucedido!');
    
    // Verificação detalhada para depuração da resposta
    if (__DEV__) {
      console.log('📄 [API] Estrutura da resposta:', Object.keys(res.data));
      if (res.data.user) {
        console.log('👤 [API] Dados do usuário recebidos:', res.data.user);
      } else if (res.data.message && res.data.message.toLowerCase().includes('bem-sucedido')) {
        console.log('✅ [API] Login confirmado pela mensagem');
      }
    }
    
    // Processa o token e dados do usuário
    if (res.data.token) {
      // Define o token para futuras requisições autenticadas
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Armazena dados no AsyncStorage para persistência
      await storeToken(res.data.token);
      
      if (res.data.user) {
        await storeUser(res.data.user);
      }
    } 
    // Se não há token, mas tem dados do usuário, salva apenas os dados do usuário
    else if (res.data.user) {
      console.log('⚠️ [API] Login sem token, mas com dados do usuário');
      await storeUser(res.data.user);
    }
    // Caso especial para quando a resposta tem um formato diferente
    else {
      console.log('⚠️ [API] Formato de resposta diferente, tentando interpretar...');
      // Procura por algum objeto que pareça conter dados de usuário
      const responseData = res.data;
      const possibleUser = findUserObject(responseData);
      
      if (possibleUser) {
        console.log('✅ [API] Encontrado objeto de usuário na resposta:', possibleUser);
        await storeUser(possibleUser);
      } else {
        console.warn('⚠️ [API] Não foi possível encontrar dados de usuário na resposta');
      }
    }
    
    return res.data;
  } catch (err: any) {
    // Log detalhado do erro técnico (apenas no console)
    if (__DEV__) {
      console.error('❌ [API] Erro detalhado de login:', err);
      
      // Informações técnicas extras para debug
      if (err.response) {
        console.error('- Status:', err.response.status);
        console.error('- Headers:', err.response.headers);
        console.error('- Data:', err.response.data);
      } else if (err.request) {
        console.error('- Request:', err.request);
      } else {
        console.error('- Mensagem:', err.message);
        console.error('- Stack:', err.stack);
      }
    }
    
    // Tratamento para mensagens de erro amigáveis
    if (err.response) {
      // Erro retornado pela API (com resposta HTTP)
      const statusCode = err.response.status;
      const errorData = err.response.data;
      
      // Mensagens de erro personalizadas com base no status
      if (statusCode === 401 || statusCode === 403) {
        throw new Error('Email ou senha incorretos');
      } else if (statusCode === 400) {
        // Para erros de validação, use uma mensagem genérica
        if (errorData?.message?.toLowerCase().includes('senha') || 
            errorData?.message?.toLowerCase().includes('password')) {
          throw new Error('A senha informada não atende aos requisitos mínimos');  
        } else if (errorData?.message?.toLowerCase().includes('email')) {
          throw new Error('Por favor, insira um email válido');
        } else {
          throw new Error('Dados de login inválidos');
        }
      } else {
        throw new Error('Não foi possível fazer login. Tente novamente mais tarde.');
      }
    } else if (err.request) {
      // Erro de conexão (sem resposta)
      throw new Error('Falha na conexão com o servidor. Verifique sua internet.');
    } else {
      // Erro desconhecido - mensagem genérica
      throw new Error('Ocorreu um erro inesperado. Tente novamente.');
    }
  }
}

/**
 * Tenta encontrar um objeto que se pareça com dados de usuário na resposta
 */
function findUserObject(data: any): any | null {
  // Se for um objeto com campos típicos de usuário
  if (data && typeof data === 'object') {
    if (data.id && data.email && (data.nome || data.name)) {
      return data;
    }
    
    // Se tiver um campo user, retorna esse campo
    if (data.user && typeof data.user === 'object') {
      return data.user;
    }
    
    // Procura em todos os campos do objeto
    for (const key in data) {
      const value = data[key];
      if (value && typeof value === 'object') {
        // Verifica se este objeto tem campos típicos de usuário
        if (value.id && value.email && (value.nome || value.name)) {
          return value;
        }
      }
    }
  }
  
  return null;
}

/** registra um novo usuário */
export async function registerUser(userData: {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  bairro_ou_distrito: string;
  cidade: string;
}): Promise<any> {
  try {
    if (__DEV__) console.log('📤 [API] Enviando registro para:', userData.email);
    
    // Faz a requisição POST para o endpoint de registro
    const res = await api.post('/users', userData);
    
    if (__DEV__) console.log('📥 [API] Registro bem-sucedido!');
    
    // Verifica se há dados de usuário na resposta
    if (res.data && res.data.user) {
      // Armazenar o token se estiver disponível
      if (res.data.token) {
        await storeToken(res.data.token);
        // Adiciona o token no cabeçalho para futuras requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      
      // Armazenar dados do usuário
      await storeUser(res.data.user);
      
      return res.data;
    } else {
      // Caso a API não retorne o usuário, tentar fazer login automaticamente
      if (__DEV__) console.log('⚠️ [API] Registro retornou sem dados completos, tentando login...');
      return await loginUser(userData.email, userData.senha);
    }
  } catch (error: any) {
    console.error('❌ [API] Erro no registro:', error);
    
    // Extrair informações mais detalhadas do erro para retornar
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
      throw {
        message: error.response.data.message || 'Erro no registro',
        statusCode: error.response.status,
        details: error.response.data
      };
    }
    
    throw error;
  }
}
