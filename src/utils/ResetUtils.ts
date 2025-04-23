import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

/**
 * Utilitários para resetar dados do aplicativo
 */
export const ResetUtils = {
  /**
   * Reseta a imagem de perfil, removendo do AsyncStorage e do sistema de arquivos
   */
  resetProfileImage: async (): Promise<boolean> => {
    try {
      // Chaves de AsyncStorage a serem removidas
      const profileImageKey = '@FoodBridge:profileImage';
      
      // Recuperar o caminho da imagem salva
      const imageUri = await AsyncStorage.getItem(profileImageKey);
      console.log("Resetando imagem de perfil:", imageUri);
      
      // Remover a chave do AsyncStorage
      await AsyncStorage.removeItem(profileImageKey);
      
      // Se tiver uma imagem salva, tenta excluí-la do sistema de arquivos
      if (imageUri) {
        try {
          const fileInfo = await FileSystem.getInfoAsync(imageUri);
          if (fileInfo.exists) {
            await FileSystem.deleteAsync(imageUri, { idempotent: true });
            console.log("Arquivo de imagem excluído:", imageUri);
          }
        } catch (e) {
          console.warn("Erro ao excluir arquivo de imagem:", e);
        }
      }
      
      // Verificar se o diretório de perfil existe
      const profileDir = `${FileSystem.documentDirectory}profile/`;
      const dirInfo = await FileSystem.getInfoAsync(profileDir);
      
      // Se o diretório existir, tentar limpar todo o conteúdo
      if (dirInfo.exists && dirInfo.isDirectory) {
        try {
          // Listar arquivos
          const files = await FileSystem.readDirectoryAsync(profileDir);
          console.log(`Encontrados ${files.length} arquivos no diretório de perfil`);
          
          // Excluir cada arquivo
          for (const file of files) {
            const filePath = `${profileDir}${file}`;
            await FileSystem.deleteAsync(filePath, { idempotent: true });
            console.log("Arquivo excluído:", filePath);
          }
        } catch (e) {
          console.warn("Erro ao limpar diretório de perfil:", e);
        }
      }
      
      console.log("Reset de imagem de perfil concluído com sucesso");
      return true;
    } catch (error) {
      console.error("Erro ao resetar imagem de perfil:", error);
      return false;
    }
  },
  
  /**
   * Reseta todos os dados do aplicativo (similar a uma desinstalação)
   */
  resetAllData: async (): Promise<boolean> => {
    try {
      // Resetar a imagem de perfil
      await ResetUtils.resetProfileImage();
      
      // Limpar todo o AsyncStorage
      await AsyncStorage.clear();
      console.log("AsyncStorage limpo completamente");
      
      return true;
    } catch (error) {
      console.error("Erro ao resetar todos os dados:", error);
      return false;
    }
  },
  
  /**
   * Exibe um diálogo de confirmação e executa o reset se confirmado
   */
  showResetConfirmation: (onComplete?: () => void) => {
    // Definir estilos diferentes baseados na plataforma
    const isIOS = Platform.OS === 'ios';
    
    Alert.alert(
      "Resetar Dados",
      "Isso irá simular uma desinstalação do aplicativo, removendo todos os dados locais. Deseja continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          // No iOS os botões são alinhados horizontalmente, então invertemos a ordem
          // para que Cancelar fique à esquerda
          isPreferred: isIOS ? false : true
        },
        {
          text: "Apenas Limpar Avatar",
          style: "default",
          onPress: async () => {
            const success = await ResetUtils.resetProfileImage();
            if (success) {
              Alert.alert(
                "Sucesso", 
                "A imagem de perfil foi resetada com sucesso.",
                [{ text: "OK", style: "default" }]
              );
              if (onComplete) onComplete();
            } else {
              Alert.alert(
                "Erro", 
                "Ocorreu um erro ao tentar resetar a imagem de perfil.",
                [{ text: "OK", style: "default" }]
              );
            }
          }
        },
        {
          text: "Resetar Tudo",
          style: "destructive",
          // No iOS destacamos essa opção como não preferida para evitar toques acidentais
          isPreferred: false,
          onPress: async () => {
            const success = await ResetUtils.resetAllData();
            if (success) {
              Alert.alert(
                "Sucesso", 
                "Todos os dados foram resetados com sucesso.",
                [{ text: "OK", style: "default" }]
              );
              if (onComplete) onComplete();
            } else {
              Alert.alert(
                "Erro", 
                "Ocorreu um erro ao tentar resetar os dados.",
                [{ text: "OK", style: "default" }]
              );
            }
          }
        }
      ],
      {
        // Configurações adicionais para um melhor visual
        cancelable: true,
      }
    );
  }
}; 