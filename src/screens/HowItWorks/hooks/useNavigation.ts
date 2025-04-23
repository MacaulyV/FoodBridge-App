import { Animated, Easing, Dimensions } from 'react-native';
import { markOnboardingComplete } from '../../../services/userService';

/**
 * Hook para gerenciar a navegação entre telas
 */
export const useNavigation = (animValues: any, navigation: any) => {
  // Obter a largura da tela para animações
  const { width } = Dimensions.get('window');
  
  // Função para animar a saída da tela e navegar para Login
  const handleNext = () => {
    // Marcar o onboarding como concluído
    markOnboardingComplete();
    
    // Reset do valor do pulso
    animValues.buttonPulse.setValue(1);
    
    // Animações paralelas: escala do botão e efeito de pulso
    Animated.parallel([
      // Animação de escala do botão
      Animated.sequence([
        // Primeiro diminui o botão (efeito de pressionar)
        Animated.timing(animValues.buttonScale, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0.0, 1, 1),
        }),
        // Depois aumenta um pouco acima do tamanho normal (efeito de "salto")
        Animated.timing(animValues.buttonScale, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
        }),
        // Retorna ao tamanho normal
        Animated.timing(animValues.buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.bezier(0.215, 0.61, 0.355, 1),
        })
      ]),
      
      // Animação do efeito de pulso
      Animated.timing(animValues.buttonPulse, {
        toValue: 1.05,
        duration: 700, // Duração mais longa para o efeito de pulso
        useNativeDriver: true,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
      })
    ]).start(() => {
      // Animação de saída ao navegar
      Animated.parallel([
        // Fade out da tela com easing cinematográfico
        Animated.timing(animValues.screenOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0.0, 1, 1),
        }),
        // Deslize para a esquerda com aceleração natural
        Animated.timing(animValues.screenSlide, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.bezier(0.4, 0.0, 1, 1),
        }),
      ]).start(() => {
        // Navegar para a tela de login
        navigation.navigate('Login');
      });
    });
  };

  // Função para voltar para a tela Welcome
  const handleBack = () => {
    // Primeiro fade out da tela atual com animação mais rápida
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: width, // Deslizar para a direita ao sair (oposto da entrada)
        duration: 200,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      })
    ]).start(() => {
      // Navegar para a tela Welcome com skipAnimation true para evitar problemas
      navigation.replace('Welcome', { 
        isReturning: true,
        fromDirection: 'left',
        skipAnimation: true // Pular animação para evitar problemas de tela branca
      });
      
      // Não é necessário resetar os valores de opacidade e posição com setTimeout
      // já que estamos usando replace em vez de navigate
    });
  };

  return {
    handleNext,
    handleBack,
  };
}; 