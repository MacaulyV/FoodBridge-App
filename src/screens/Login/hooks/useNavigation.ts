import { Animated, Alert } from 'react-native';
import { loginUser, checkApiConnection } from '../../../services/authService';
import { API_URL } from '../../../services/api';
import { navigateByUserProfile } from '../../../services/userService';

/**
 * Hook para gerenciar a navegação entre telas e ações do formulário
 */
export const useNavigation = (animValues: any, navigation: any) => {
  // Navegar para a tela anterior
  const handleBack = () => {
    // Animação de saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Voltar para a tela anterior
      navigation.goBack();
    });
  };
  
  // Função para lidar com o login
  const handleLogin = async (email: string, password: string) => {
    try {
      // Chamada para a API de autenticação
      console.log(`🔑 [LOGIN] Tentando login com ${email}`);
      const userData = await loginUser(email, password);
      
      console.log('✅ [LOGIN] Usuário autenticado com sucesso:', userData);
      
      // Verificar se os dados do usuário foram recebidos corretamente
      if (userData.user) {
        console.log('✅ [LOGIN] Dados do usuário recebidos:', userData.user);
      } else {
        console.warn('⚠️ [LOGIN] Resposta sem dados do usuário:', userData);
      }
      
      // Animação de saída da tela
      Animated.parallel([
        Animated.timing(animValues.screenOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animValues.screenSlide, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        // Navegar para a tela apropriada com base no tipo de perfil
        const userObj = userData.user || userData;
        const profileType = userObj?.tipo;
        console.log('🔄 [LOGIN] Navegando com perfil:', profileType);
        
        await navigateByUserProfile(navigation, profileType);
      });
    } catch (error: any) {
      // LOG detalhado do erro técnico (apenas no console)
      console.error('❌ [LOGIN] Erro técnico:', error);
      
      // Mostra mensagem amigável para o usuário, sem detalhes técnicos
      let errorMessage = 'Não foi possível fazer login. Verifique suas credenciais.';
      
      // Se o erro vem da API com status 401 ou 403, é credencial inválida
      if (error.message?.includes('401') || error.message?.includes('403') || 
          error.message?.includes('incorretos')) {
        errorMessage = 'Email ou senha incorretos. Por favor, tente novamente.';
      } 
      // Se o erro inclui "password" ou "senha", problema com a senha
      else if (error.message?.toLowerCase().includes('password') || 
               error.message?.toLowerCase().includes('senha') || 
               error.message?.toLowerCase().includes('requisitos')) {
        errorMessage = 'A senha informada não atende aos requisitos mínimos.';
      }
      // Se o erro inclui "email", problema com o email
      else if (error.message?.toLowerCase().includes('email')) {
        errorMessage = 'Por favor, insira um email válido.';
      }
      // Se o erro inclui "conexão" ou "connect" ou outros erros de rede
      else if (error.message?.toLowerCase().includes('conexão') || 
               error.message?.toLowerCase().includes('connect') ||
               error.message?.toLowerCase().includes('network') ||
               error.message?.toLowerCase().includes('internet') ||
               error.message?.toLowerCase().includes('timeout')) {
        errorMessage = 'Falha na conexão com o servidor. Verifique sua internet e tente novamente.';
      }
      
      // Exibe mensagem amigável para o usuário
      Alert.alert(
        'Erro de Autenticação',
        errorMessage
      );
    }
  };
  
  // Função para lidar com o esqueceu a senha
  const handleForgotPassword = () => {
    // A função será implementada futuramente
    // Navegar para a tela de redefinição de senha quando estiver pronta
    console.log("Redefinição de senha solicitada");
  };
  
  // Função para navegar para a tela de criação de conta
  const handleCreateAccount = () => {
    // Animação de saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navegar para a tela de escolha de perfil
      navigation.navigate('ChooseProfile');
    });
  };
  
  return {
    handleBack,
    handleLogin,
    handleForgotPassword,
    handleCreateAccount
  };
}; 