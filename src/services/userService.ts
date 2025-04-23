import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { ProfileImageService } from './ProfileImageService';

// Chave para armazenar os dados do usuário
const USER_DATA_KEY = '@FoodBridge:userData';
// Chave para verificar se o usuário já viu as telas de introdução
const ONBOARDING_COMPLETE_KEY = '@FoodBridge:onboarded';

// Interface para os dados do usuário
export interface UserData {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  bairro_ou_distrito: string;
  tipo: string;
  avatar?: string;
}

/**
 * Salva os dados do usuário no AsyncStorage
 */
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    console.log('✅ [STORAGE] Dados do usuário salvos com sucesso');
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao salvar dados do usuário:', error);
    throw error;
  }
};

/**
 * Recupera os dados do usuário do AsyncStorage
 */
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      console.log('ℹ️ [STORAGE] Nenhum dado de usuário encontrado');
      return null;
    }
    
    console.log('✅ [STORAGE] Dados do usuário recuperados com sucesso');
    return JSON.parse(userData);
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

/**
 * Atualiza parcialmente os dados do usuário
 */
export const updateUserData = async (updatedData: Partial<UserData>): Promise<UserData | null> => {
  try {
    // Recuperar dados atuais
    const currentData = await getUserData();
    if (!currentData) {
      console.warn('⚠️ [STORAGE] Tentativa de atualizar dados inexistentes');
      return null;
    }
    
    // Mesclar dados atuais com atualizações
    const newData = { ...currentData, ...updatedData };
    
    // Salvar dados atualizados
    await saveUserData(newData);
    
    console.log('✅ [STORAGE] Dados do usuário atualizados com sucesso');
    return newData;
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao atualizar dados do usuário:', error);
    return null;
  }
};

/**
 * Remove os dados do usuário do AsyncStorage
 */
export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
    console.log('✅ [STORAGE] Dados do usuário removidos com sucesso');
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao remover dados do usuário:', error);
  }
};

/**
 * Adapta os dados da API para o formato utilizado pelo app
 */
export const mapApiUserToAppUser = (apiUser: any): UserData => {
  console.log('🔄 [STORAGE] Mapeando dados do usuário da API:', apiUser);
  
  if (!apiUser) {
    console.warn('⚠️ [STORAGE] Tentativa de mapear um usuário nulo ou indefinido');
    return {
      id: '',
      nome: 'Usuário FoodBridge',
      email: 'usuario@exemplo.com',
      cidade: 'Não informada',
      bairro_ou_distrito: 'Não informado',
      tipo: 'Pessoa Física',
      avatar: '',
    };
  }
  
  // Verificar se os dados parecem ser de uma resposta de sucesso sem dados completos
  if (apiUser.message && !apiUser.id && !apiUser.nome) {
    console.warn('⚠️ [STORAGE] Resposta da API não contém dados completos, apenas mensagem de sucesso');
    
    // Nota: não podemos acessar o AsyncStorage de forma síncrona,
    // então devemos confiar nos dados fornecidos pelo método de atualização
  }
  
  // Certifique-se de não perder dados ao mapear
  const mappedUser = {
    id: apiUser.id || '',
    nome: apiUser.nome || '',
    email: apiUser.email || '',
    cidade: apiUser.cidade || '',
    bairro_ou_distrito: apiUser.bairro_ou_distrito || '',
    tipo: apiUser.tipo || 'Pessoa Física',
    avatar: apiUser.avatar || '',
  };
  
  console.log('✅ [STORAGE] Dados mapeados com sucesso:', mappedUser);
  return mappedUser;
};

/**
 * Deleta a conta do usuário na API e limpa todos os dados locais
 */
export const deleteUserAccount = async (): Promise<boolean> => {
  try {
    // Obter ID do usuário
    const userData = await getUserData();
    if (!userData || !userData.id) {
      console.error('❌ [USER] Não foi possível excluir conta: ID do usuário não encontrado');
      throw new Error('ID do usuário não encontrado');
    }
    
    const userId = userData.id;
    console.log(`🗑️ [USER] Iniciando exclusão de conta para o usuário ID: ${userId}`);
    
    // Enviar requisição DELETE para a API
    await api.delete(`/users/${userId}`);
    
    console.log('✅ [USER] Conta excluída na API com sucesso');
    
    // Limpar todos os dados locais
    await cleanAllUserData();
    
    return true;
  } catch (error: any) {
    console.error('❌ [USER] Erro ao excluir conta:', error.message);
    
    // Verificar se é um erro de rede ou da API
    if (error.response) {
      console.error(`❌ [USER] API retornou erro ${error.response.status}:`, error.response.data);
    }
    
    throw error;
  }
};

/**
 * Limpa todos os dados do usuário no armazenamento local, incluindo avatar
 */
export const cleanAllUserData = async (): Promise<void> => {
  try {
    console.log('🧹 [USER] Iniciando limpeza de todos os dados do usuário');
    
    // 1. Remover dados do usuário
    await clearUserData();
    
    // 2. Remover token de autenticação
    await AsyncStorage.removeItem('@FoodBridge:token');
    await AsyncStorage.removeItem('@FoodBridge:user');
    
    // 3. Remover imagem de avatar
    await ProfileImageService.removeProfileImage();
    
    // 4. Remover quaisquer outras chaves relacionadas ao usuário
    const allKeys = await AsyncStorage.getAllKeys();
    const userRelatedKeys = allKeys.filter(key => 
      key.startsWith('@FoodBridge:') && 
      key !== '@FoodBridge:onboarded' // Manter apenas flags de sistema
    );
    
    if (userRelatedKeys.length > 0) {
      await AsyncStorage.multiRemove(userRelatedKeys);
    }
    
    // 5. Limpar cabeçalhos de autenticação da API
    if (api.defaults.headers.common['Authorization']) {
      delete api.defaults.headers.common['Authorization'];
    }
    
    console.log('✅ [USER] Todos os dados do usuário foram removidos com sucesso');
  } catch (error) {
    console.error('❌ [USER] Erro ao limpar dados do usuário:', error);
    throw error;
  }
};

/**
 * Atualiza os dados do usuário na API e no armazenamento local
 */
export const updateUserAccount = async (userData: {
  nome: string;
  email: string;
  senha?: string;
  tipo: string;
  bairro_ou_distrito: string;
  cidade: string;
}): Promise<UserData> => {
  try {
    // Validar senha mínima
    if (userData.senha && userData.senha.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres');
    }
    
    // Obter ID do usuário atual
    const currentUser = await getUserData();
    if (!currentUser || !currentUser.id) {
      console.error('❌ [USER] Não foi possível atualizar usuário: ID não encontrado');
      throw new Error('ID do usuário não encontrado');
    }
    
    const userId = currentUser.id;
    console.log(`🔄 [USER] Iniciando atualização para o usuário ID: ${userId}`);
    
    // Criar payload para a API
    const payload = { ...userData };
    // A senha é sempre necessária para a API, mesmo que vazia
    
    // Enviar requisição PUT para a API
    const response = await api.put(`/users/${userId}`, payload);
    
    console.log('✅ [USER] Dados atualizados na API com sucesso');
    
    // Extrair dados atualizados da resposta
    const responseData = response.data;
    
    // Verificar se a resposta contém apenas uma mensagem de sucesso (sem dados do usuário)
    const isOnlySuccessMessage = responseData && 
                               responseData.message && 
                               (!responseData.id || 
                                !responseData.nome || 
                                !responseData.email);
    
    // Se a API não retornar os dados completos, usamos os dados enviados + ID atual
    let updatedUserData;
    if (isOnlySuccessMessage) {
      console.log('ℹ️ [USER] API retornou apenas mensagem de sucesso, usando dados enviados como referência');
      updatedUserData = {
        id: userId,
        nome: userData.nome,
        email: userData.email,
        cidade: userData.cidade,
        bairro_ou_distrito: userData.bairro_ou_distrito,
        tipo: userData.tipo,
        avatar: currentUser.avatar // Preservar o avatar atual
      };
    } else {
      updatedUserData = responseData;
    }
    
    // Mapear os dados da API para o formato do app e salvar no storage
    const mappedUserData = mapApiUserToAppUser(updatedUserData);
    await saveUserData(mappedUserData);
    
    console.log('✅ [USER] Dados atualizados no storage com sucesso');
    
    return mappedUserData;
  } catch (error: any) {
    console.error('❌ [USER] Erro ao atualizar dados do usuário:', error.message);
    
    // Verificar se é um erro de rede ou da API
    if (error.response) {
      console.error(`❌ [USER] API retornou erro ${error.response.status}:`, error.response.data);
      
      // Extrair mensagem de erro da API se disponível
      const apiErrorMessage = error.response.data?.message || 
                             error.response.data?.error || 
                             'A API retornou um erro';
      
      throw new Error(apiErrorMessage);
    }
    
    throw error;
  }
};

/**
 * Busca os dados completos do usuário, incluindo a lista de doações
 */
export const getUserComplete = async (): Promise<{
  usuario: UserData;
  doacoes: any[];
} | null> => {
  try {
    // Obter ID do usuário
    const userData = await getUserData();
    if (!userData || !userData.id) {
      console.error('❌ [USER] Não foi possível buscar dados completos: ID do usuário não encontrado');
      return null;
    }
    
    const userId = userData.id;
    console.log(`🔍 [USER] Buscando dados completos para o usuário ID: ${userId}`);
    
    // Fazer requisição para obter dados completos
    const response = await api.get(`/users/${userId}/completo`);
    
    console.log('✅ [USER] Dados completos do usuário recebidos com sucesso');
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [USER] Erro ao buscar dados completos do usuário:', error.message);
    
    // Verificar se é um erro de rede ou da API
    if (error.response) {
      console.error(`❌ [USER] API retornou erro ${error.response.status}:`, error.response.data);
    }
    
    return null;
  }
};

/**
 * Navega para a tela apropriada com base no tipo de perfil do usuário
 * @param navigation Objeto de navegação
 * @param profileType Tipo de perfil do usuário (opcional, se não fornecido será buscado do storage)
 */
export const navigateByUserProfile = async (navigation: any, profileType?: string): Promise<void> => {
  try {
    // Se o tipo de perfil não foi fornecido, buscar do storage
    if (!profileType) {
      const userData = await getUserData();
      if (!userData || !userData.tipo) {
        console.log('ℹ️ [NAV] Nenhum perfil encontrado, navegando para Welcome');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
        return;
      }
      profileType = userData.tipo;
    }
    
    console.log(`🔄 [NAV] Redirecionando com base no perfil: ${profileType}`);
    
    // Redirecionar com base no tipo de perfil
    switch (profileType) {
      case 'ONG':
        console.log('🔀 [NAV] Redirecionando para DonationsFeed (ONG)');
        navigation.reset({
          index: 0,
          routes: [{ name: 'DonationsFeed' }],
        });
        break;
      case 'Pessoa Física':
      case 'Pessoa Jurídica':
        console.log('🔀 [NAV] Redirecionando para MyDonations (Pessoa Física/Jurídica)');
        navigation.reset({
          index: 0,
          routes: [{ name: 'MyDonations' }],
        });
        break;
      default:
        console.log('⚠️ [NAV] Tipo não reconhecido, navegando para Welcome');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
    }
  } catch (error) {
    console.error('❌ [NAV] Erro ao navegar por perfil:', error);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  }
};

/**
 * Marca as telas de introdução (Welcome e HowItWorks) como visualizadas
 */
export const markOnboardingComplete = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    console.log('✅ [STORAGE] Onboarding marcado como completo');
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao marcar onboarding como completo:', error);
  }
};

/**
 * Verifica se o usuário já visualizou as telas de introdução
 */
export const hasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const onboarded = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return onboarded === 'true';
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao verificar status do onboarding:', error);
    return false;
  }
};

/**
 * APENAS PARA TESTE: Redefine o status do onboarding para que as telas introdutórias sejam mostradas novamente
 */
export const resetOnboardingStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETE_KEY);
    console.log('✅ [STORAGE][DEBUG] Status de onboarding redefinido');
  } catch (error) {
    console.error('❌ [STORAGE][DEBUG] Erro ao redefinir status de onboarding:', error);
  }
}; 