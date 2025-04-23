import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar a navegação entre telas
 */
export const useNavigation = (animValues: any, navigation: any) => {
  // Navegar para a tela HowItWorks quando o usuário clicar em "Voltar"
  const handleBack = () => {
    // Animação de saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
    ]).start(() => {
      // Navegar especificamente para a tela HowItWorks
      navigation.navigate('HowItWorks');
    });
  };
  
  // Função para opção de doação
  const handleDonate = () => {
    // Animação de saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
    ]).start(() => {
      // Navegar para a tela Register com o tipo de usuário "donor"
      navigation.navigate('Register', { userType: 'donor' });
    });
  };
  
  // Função para opção de recebimento
  const handleReceive = () => {
    // Animação de saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
    ]).start(() => {
      // Navegar para a tela Register com o tipo de usuário "receiver"
      navigation.navigate('Register', { userType: 'receiver' });
    });
  };
  
  return {
    handleBack,
    handleDonate,
    handleReceive,
  };
}; 