import { useCallback } from 'react';
import { Animated } from 'react-native';
import { NavigationProps } from '../types';

/**
 * Hook para gerenciar funções de navegação
 */
export const useNavigation = (
  animValues: any,
  navigation: NavigationProps['navigation']
) => {
  // Função para voltar para a tela anterior
  const handleBack = useCallback(() => {
    // Animar o botão de voltar
    Animated.sequence([
      Animated.timing(animValues.navBarBackButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animValues.navBarBackButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();

    // Animar saída da tela
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      // Navegar de volta após a animação
      navigation.goBack();
    });
  }, [navigation, animValues]);

  // Função para animar pressionamento de botão
  const animateButtonPress = useCallback((buttonScale: Animated.Value) => {
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
  }, []);

  return {
    handleBack,
    animateButtonPress
  };
}; 