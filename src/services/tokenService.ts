import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves usadas para armazenar dados no AsyncStorage
const TOKEN_KEY = '@FoodBridge:token';
const USER_KEY = '@FoodBridge:user';

/**
 * Armazena o token de autenticação no AsyncStorage
 * @param token Token JWT recebido da API
 */
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
  }
};

/**
 * Recupera o token de autenticação do AsyncStorage
 * @returns Token JWT ou null se não existir
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao recuperar token:', error);
    return null;
  }
};

/**
 * Armazena os dados do usuário no AsyncStorage
 * @param user Objeto com dados do usuário
 */
export const storeUser = async (user: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

/**
 * Recupera os dados do usuário do AsyncStorage
 * @returns Objeto com dados do usuário ou null se não existir
 */
export const getUser = async (): Promise<any | null> => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

/**
 * Remove token e dados do usuário do AsyncStorage (logout)
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  } catch (error) {
    console.error('Erro ao limpar dados de autenticação:', error);
  }
}; 