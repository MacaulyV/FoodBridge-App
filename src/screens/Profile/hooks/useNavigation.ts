import { Animated, Alert } from 'react-native';
import { NavigationProps } from '../types';
import { deleteUserAccount } from '../../../services/userService';

/**
 * Hook para gerenciar a navegação com animações
 */
export const useNavigation = (
  animValues: any, 
  navigation: NavigationProps['navigation']
) => {
  // Função para voltar com animação
  const handleBack = () => {
    // Animar saída da tela atual
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Voltar após a animação terminar
      navigation.goBack();
    });
  };
  
  // Função para editar perfil
  const handleEditProfile = (setModalVisible: (visible: boolean) => void) => {
    // Mostrar modal de edição
    setModalVisible(true);
  };
  
  // Função para excluir conta
  const handleDeleteAccount = (setDeleteModalVisible: (visible: boolean) => void) => {
    // Mostrar modal de confirmação
    setDeleteModalVisible(true);
  };
  
  // Função para confirmar a exclusão de conta
  const handleConfirmDelete = async () => {
    try {
      console.log('🗑️ [PROFILE] Iniciando processo de exclusão de conta...');
      
      // Chamar o serviço de exclusão da conta (integração com API)
      await deleteUserAccount();
      
      console.log('✅ [PROFILE] Conta excluída com sucesso!');
      
      // Mostrar mensagem de sucesso
      Alert.alert(
        "Conta Excluída",
        "Sua conta foi excluída com sucesso. Esperamos vê-lo novamente em breve!",
        [{ text: "OK" }]
      );
      
      // Animar saída da tela e navegar para login
      Animated.parallel([
        Animated.timing(animValues.screenOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animValues.screenSlide, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Navegar para tela de login após a animação terminar
        navigation.navigate('Login');
      });
    } catch (error: any) {
      console.error('❌ [PROFILE] Erro ao excluir conta:', error);
      
      // Mostrar mensagem de erro para o usuário
      Alert.alert(
        "Erro ao Excluir Conta",
        error.message || "Não foi possível excluir sua conta. Por favor, tente novamente mais tarde.",
        [{ text: "OK" }]
      );
    }
  };
  
  return {
    handleBack,
    handleEditProfile,
    handleDeleteAccount,
    handleConfirmDelete,
  };
}; 