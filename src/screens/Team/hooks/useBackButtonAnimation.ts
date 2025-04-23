import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar as animações do botão de voltar
 */
export const useBackButtonAnimation = () => {
  // Referência para a escala do botão
  const backButtonScale = useRef(new Animated.Value(1)).current;
  
  // Animar o pressionamento do botão e chamar a função de callback
  const animatePress = (callback: () => void) => {
    // Sequência de animação para efeito de pressionamento
    Animated.sequence([
      // Primeiro reduz a escala para dar impressão de pressionamento
      Animated.timing(backButtonScale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      }),
      // Depois aumenta a escala para voltar ao tamanho normal
      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }),
    ]).start(() => {
      // Chamar o callback após a animação
      if (callback) callback();
    });
  };
  
  return {
    backButtonScale,
    animatePress,
  };
}; 