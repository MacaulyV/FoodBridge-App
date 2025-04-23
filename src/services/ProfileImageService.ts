import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const PROFILE_IMAGE_KEY = '@FoodBridge:profileImage';

/**
 * Serviço para gerenciar a imagem de perfil do usuário
 */
export const ProfileImageService = {
  /**
   * Recupera o caminho da imagem de perfil salva
   */
  getProfileImage: async (): Promise<string | null> => {
    try {
      const imageUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      console.log("Recuperando imagem de perfil do AsyncStorage:", imageUri);
      
      if (!imageUri) {
        console.log("Nenhuma imagem de perfil encontrada no AsyncStorage");
        return null;
      }
      
      // Verificar se o arquivo ainda existe
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      console.log("Verificando arquivo de imagem:", fileInfo);
      
      if (!fileInfo.exists) {
        // Se o arquivo não existir mais, limpar a referência
        console.warn('Arquivo de imagem de perfil não encontrado, removendo referência');
        await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
        return null;
      }
      
      return imageUri;
    } catch (error) {
      console.error('Erro ao recuperar imagem de perfil:', error);
      return null;
    }
  },
  
  /**
   * Salva o caminho da imagem de perfil
   */
  saveProfileImage: async (imageUri: string): Promise<boolean> => {
    try {
      if (!imageUri) {
        console.error('URI de imagem vazia ou inválida');
        return false;
      }
      
      console.log("Tentando salvar imagem:", imageUri);
      
      // Verificar se o arquivo de origem existe
      const sourceFileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!sourceFileInfo.exists) {
        console.error('Arquivo de origem não existe:', imageUri);
        return false;
      }
      
      // Verificar se o diretório de perfil existe
      const profileDir = `${FileSystem.documentDirectory}profile/`;
      console.log("Diretório de destino:", profileDir);
      
      const dirInfo = await FileSystem.getInfoAsync(profileDir);
      console.log("Info do diretório:", dirInfo);
      
      if (!dirInfo.exists) {
        console.log('Criando diretório de perfil:', profileDir);
        await FileSystem.makeDirectoryAsync(profileDir, { intermediates: true });
        console.log('Diretório de perfil criado');
      }
      
      // Gerar um nome de arquivo único baseado no timestamp
      const timestamp = new Date().getTime();
      const fileName = `profile_${timestamp}.jpg`;
      const newUri = `${profileDir}${fileName}`;
      console.log("Nova URI de destino:", newUri);
      
      // Copiar a imagem para o diretório de armazenamento permanente
      await FileSystem.copyAsync({
        from: imageUri,
        to: newUri
      });
      
      console.log('Imagem copiada para armazenamento permanente:', newUri);
      
      // Remover imagem anterior se existir
      const oldImageUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      if (oldImageUri && oldImageUri !== imageUri && oldImageUri !== newUri) {
        try {
          console.log("Tentando remover imagem anterior:", oldImageUri);
          const fileInfo = await FileSystem.getInfoAsync(oldImageUri);
          if (fileInfo.exists) {
            await FileSystem.deleteAsync(oldImageUri, { idempotent: true });
            console.log('Imagem antiga removida:', oldImageUri);
          }
        } catch (e) {
          // Ignorar erros ao tentar excluir a imagem antiga
          console.warn('Não foi possível excluir a imagem antiga:', e);
        }
      }
      
      // Salvar o caminho da nova imagem no AsyncStorage
      console.log("Salvando referência no AsyncStorage:", newUri);
      await AsyncStorage.setItem(PROFILE_IMAGE_KEY, newUri);
      
      // Verificar se o arquivo foi realmente salvo
      const savedFileInfo = await FileSystem.getInfoAsync(newUri);
      console.log("Verificando se o arquivo foi salvo:", savedFileInfo);
      
      if (!savedFileInfo.exists) {
        console.error('Falha ao verificar se o arquivo foi salvo:', newUri);
        return false;
      }
      
      // Força a sincronização do AsyncStorage no Android
      if (Platform.OS === 'android') {
        try {
          // Dupla verificação para garantir persistência no Android
          const testKey = '@FoodBridge:testKey';
          await AsyncStorage.setItem(testKey, 'test');
          await AsyncStorage.removeItem(testKey);
        } catch (e) {
          console.warn('Erro na sincronização forçada do AsyncStorage:', e);
        }
      }
      
      console.log("Imagem de perfil salva com sucesso");
      return true;
    } catch (error) {
      console.error('Erro ao salvar imagem de perfil:', error);
      return false;
    }
  },
  
  /**
   * Remove a imagem de perfil atual
   */
  removeProfileImage: async (): Promise<boolean> => {
    try {
      const imageUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      console.log("Tentando remover imagem de perfil:", imageUri);
      
      if (imageUri) {
        // Verificar se o arquivo existe
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        console.log("Info do arquivo a ser removido:", fileInfo);
        
        if (fileInfo.exists) {
          // Excluir o arquivo
          await FileSystem.deleteAsync(imageUri, { idempotent: true });
          console.log('Imagem de perfil removida:', imageUri);
        } else {
          console.log('Arquivo não encontrado para remoção');
        }
        
        // Remover a referência do AsyncStorage
        await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
        console.log('Referência removida do AsyncStorage');
      } else {
        console.log('Nenhuma imagem de perfil encontrada para remover');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao remover imagem de perfil:', error);
      return false;
    }
  }
}; 