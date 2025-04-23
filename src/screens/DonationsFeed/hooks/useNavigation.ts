import { Animated } from 'react-native';

/**
 * Hook para gerenciar a navegação da tela
 */
export const useNavigation = (animValues: any, navigation: any) => {
  // Voltar para a tela anterior
  const handleBack = () => {
    // Animar o botão de voltar ao ser pressionado
    Animated.sequence([
      Animated.timing(animValues.backButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animValues.backButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start(() => {
      // Navegar para a tela anterior
      navigation.goBack();
    });
  };
  
  // Animar qualquer botão ao ser pressionado
  const animateButtonPress = (buttonScale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };
  
  return {
    handleBack,
    animateButtonPress
  };
}; 