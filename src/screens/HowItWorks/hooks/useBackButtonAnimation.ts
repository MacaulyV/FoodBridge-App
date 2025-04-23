import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar a animação de pulso do botão Voltar
 */
export const useBackButtonAnimation = () => {
  // Criando valores de animação
  const backButtonScale = useRef(new Animated.Value(1)).current;
  
  // Função para iniciar a animação de pulso
  const startPulseAnimation = () => {
    // Loop de animação de pulso suave
    Animated.loop(
      Animated.sequence([
        // Aumenta ligeiramente
        Animated.timing(backButtonScale, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        // Retorna ao tamanho normal
        Animated.timing(backButtonScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
  };
  
  // Iniciar a animação quando o componente for montado
  useEffect(() => {
    startPulseAnimation();
    // Não é necessário limpar a animação já que ela continua por toda a vida útil do componente
  }, []);
  
  // Função para animar o botão quando pressionado
  const animatePress = (callback: () => void) => {
    Animated.sequence([
      // Primeiro diminui o botão (efeito de pressionar)
      Animated.timing(backButtonScale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }),
      // Depois aumenta um pouco acima do tamanho normal (efeito de "salto")
      Animated.timing(backButtonScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
      }),
    ]).start(() => {
      // Retomar a animação de pulso normal e executar o callback
      startPulseAnimation();
      callback();
    });
  };
  
  return {
    backButtonScale,
    animatePress
  };
}; 