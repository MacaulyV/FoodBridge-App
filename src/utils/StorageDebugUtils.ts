import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * Utilitários para depuração do AsyncStorage
 */
export const StorageDebugUtils = {
  /**
   * Lista todas as chaves armazenadas no AsyncStorage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('🔑 [STORAGE_DEBUG] Todas as chaves:', keys);
      return keys;
    } catch (error) {
      console.error('❌ [STORAGE_DEBUG] Erro ao listar chaves:', error);
      return [];
    }
  },

  /**
   * Obtém e loga o valor de uma chave específica
   */
  async getItemValue(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(`🔍 [STORAGE_DEBUG] Valor para chave ${key}:`, value);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`❌ [STORAGE_DEBUG] Erro ao obter valor para ${key}:`, error);
      return null;
    }
  },

  /**
   * Limpa todas as chaves de um determinado namespace
   */
  async clearNamespace(namespace: string): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key.startsWith(namespace));
      
      if (keysToRemove.length === 0) {
        console.log(`ℹ️ [STORAGE_DEBUG] Nenhuma chave encontrada com o namespace ${namespace}`);
        return;
      }
      
      await AsyncStorage.multiRemove(keysToRemove);
      console.log(`🧹 [STORAGE_DEBUG] Removidas ${keysToRemove.length} chaves com o namespace ${namespace}:`, keysToRemove);
    } catch (error) {
      console.error(`❌ [STORAGE_DEBUG] Erro ao limpar namespace ${namespace}:`, error);
    }
  },

  /**
   * Limpa todas as chaves do FoodBridge
   */
  async clearAllFoodBridgeData(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key.startsWith('@FoodBridge'));
      
      if (keysToRemove.length === 0) {
        console.log('ℹ️ [STORAGE_DEBUG] Nenhum dado do FoodBridge encontrado');
        return;
      }
      
      await AsyncStorage.multiRemove(keysToRemove);
      console.log(`🧹 [STORAGE_DEBUG] Removidas ${keysToRemove.length} chaves do FoodBridge:`, keysToRemove);
    } catch (error) {
      console.error('❌ [STORAGE_DEBUG] Erro ao limpar dados do FoodBridge:', error);
    }
  },

  /**
   * Mostra um diálogo para confirmar limpeza de todos os dados
   */
  showClearDataConfirmation(): void {
    Alert.alert(
      'Limpar Dados de Armazenamento',
      'Isso apagará todos os dados salvos do FoodBridge. Continuar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await this.clearAllFoodBridgeData();
            Alert.alert('Concluído', 'Todos os dados foram limpos.');
          },
        },
      ],
      { cancelable: true }
    );
  },
}; 