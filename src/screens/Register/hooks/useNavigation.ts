import { Animated, Alert } from 'react-native';
import { useState } from 'react';
import { RegisterFormData, UserType } from '../types';
import { registerUser } from '../../../services/authService';
import { navigateByUserProfile } from '../../../services/userService';

export const useRegistrationLogic = (animValues: any, navigation: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para voltar para a tela anterior com animação
  const handleBack = () => {
    // Animar a saída da tela com deslize para a direita e fade out
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 300, // Deslizar para fora da tela (direita)
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navegar especificamente para a tela ChooseProfile
      navigation.navigate('ChooseProfile');
    });
  };
  
  // Função para realizar o registro do usuário
  const submitRegistration = async (formData: RegisterFormData, userType: UserType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mapear os dados do formulário para o formato da API
      const userData = {
        nome: formData.fullName,
        email: formData.email,
        senha: formData.password,
        tipo: userType === 'donor' 
          ? (formData.donorType === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica')
          : (formData.receiverType === 'individual' ? 'Pessoa Física' : 'ONG'),
        bairro_ou_distrito: formData.district,
        cidade: formData.city
      };
      
      console.log('🔄 [REGISTER] Enviando dados de registro:', { ...userData, senha: '*****' });
      
      // Chamar a API para registrar o usuário
      const response = await registerUser(userData);
      
      console.log('✅ [REGISTER] Registro bem-sucedido:', response);
      
      // Alertar o usuário do sucesso
      Alert.alert(
        'Sucesso',
        'Seu cadastro foi realizado com sucesso! Você será redirecionado para a área principal.',
        [
          { 
            text: 'OK',
            onPress: () => {
              // Animação de saída da tela
              Animated.parallel([
                Animated.timing(animValues.screenOpacity, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }),
                Animated.timing(animValues.screenSlide, {
                  toValue: -300, // Deslocamento horizontal (esquerda)
                  duration: 300,
                  useNativeDriver: true,
                }),
              ]).start(async () => {
                // Navegar para a tela apropriada com base no tipo de perfil
                await navigateByUserProfile(navigation, userData.tipo);
              });
            }
          }
        ]
      );
    } catch (err: any) {
      console.error('❌ [REGISTER] Erro no registro:', err);
      
      // Extrair a mensagem de erro apropriada
      let errorMessage = 'Não foi possível completar o cadastro. Tente novamente.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      
      // Exibir alerta de erro
      Alert.alert(
        'Erro no cadastro',
        errorMessage,
        [{ text: 'OK' }]
      );
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    handleBack,
    submitRegistration,
    isLoading,
    error
  };
}; 