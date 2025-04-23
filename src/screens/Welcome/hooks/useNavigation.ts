import { Animated } from 'react-native';
import { customEasings } from '../../../utils/animations';

interface NavigationAnimationValues {
  buttonScale: Animated.Value;
  buttonPulse: Animated.Value;
  screenOpacity: Animated.Value;
  screenSlide: Animated.Value;
  width: number;
}

/**
 * Hook para gerenciar navegação e transições entre telas
 */
export const useNavigation = (
  animValues: NavigationAnimationValues,
  navigation: any
) => {
  // Função para navegar para a próxima tela
  const handleNext = () => {
    // Reset do valor do pulso
    animValues.buttonPulse.setValue(0);
    
    // Animações paralelas: escala do botão e efeito de pulso
    Animated.parallel([
      // Animação de escala do botão
      Animated.sequence([
        // Primeiro diminui o botão (efeito de pressionar)
        Animated.timing(animValues.buttonScale, {
          toValue: 0.95,
          duration: 150,
          easing: customEasings.accelerate,
          useNativeDriver: true
        }),
        // Depois aumenta um pouco acima do tamanho normal (efeito de "salto")
        Animated.timing(animValues.buttonScale, {
          toValue: 1.05,
          duration: 150,
          easing: customEasings.decelerate,
          useNativeDriver: true
        }),
        // Retorna ao tamanho normal
        Animated.timing(animValues.buttonScale, {
          toValue: 1,
          duration: 100,
          easing: customEasings.decelerate,
          useNativeDriver: true
        })
      ]),
      
      // Animação do efeito de pulso
      Animated.timing(animValues.buttonPulse, {
        toValue: 1,
        duration: 700, // Duração mais longa para o efeito de pulso
        easing: customEasings.accelerate,
        useNativeDriver: true
      })
    ]).start(() => {
      // Animação de saída ao navegar
      Animated.parallel([
        // Fade out da tela com easing cinematográfico
        Animated.timing(animValues.screenOpacity, {
          toValue: 0,
          duration: 800,
          easing: customEasings.cinematic,
          useNativeDriver: true
        }),
        // Deslize para a direita com aceleração natural
        Animated.timing(animValues.screenSlide, {
          toValue: animValues.width,
          duration: 700,
          easing: customEasings.accelerate,
          useNativeDriver: true
        })
      ]).start(() => {
        // Navegar para a tela de Como Funciona
        navigation.navigate('HowItWorks');
      });
    });
  };

  return {
    handleNext
  };
}; 