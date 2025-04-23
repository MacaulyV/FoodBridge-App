import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar as animações do conteúdo da tela
 */
export const useContentAnimation = (animValues: any) => {
  // Animar o gradiente e outros elementos de fundo
  const animateBackground = () => {
    Animated.timing(animValues.gradientOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
  };
  
  // Animar a entrada da tela inteira
  const animateScreenEntry = () => {
    Animated.timing(animValues.screenOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    Animated.timing(animValues.screenSlide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
  };
  
  // Animar a imagem ilustrativa
  const animateImage = () => {
    // Mostrar a imagem com fade in
    Animated.timing(animValues.imageOpacity, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    // Animar escala da imagem
    Animated.timing(animValues.imageScale, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    }).start();
    
    // Animar movimento vertical da imagem - descendo para uma posição mais baixa que a original
    Animated.timing(animValues.imageTranslateY, {
      toValue: 50, // Valor positivo coloca a imagem mais baixa (50 unidades abaixo da posição original)
      duration: 1800, // Movimento lento e suave
      delay: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Easing suave e linear
    }).start();
  };
  
  // Animar o título e descrição
  const animateTexts = () => {
    // Animar título
    Animated.timing(animValues.titleOpacity, {
      toValue: 1,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    Animated.timing(animValues.titleTranslateY, {
      toValue: 0,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
      easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    }).start();
    
    // Animar descrição
    Animated.timing(animValues.descriptionOpacity, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    Animated.timing(animValues.descriptionTranslateY, {
      toValue: 0,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    }).start();
  };
  
  // Animar o botão e os indicadores
  const animateControls = () => {
    // Animar botão
    Animated.timing(animValues.buttonOpacity, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
    
    Animated.timing(animValues.buttonScale, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
      easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    }).start();
    
    Animated.timing(animValues.buttonTranslateY, {
      toValue: 0,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
      easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    }).start();
    
    // Pulsar botão suavemente - Animação melhorada
    Animated.loop(
      Animated.sequence([
        // Aumenta ligeiramente o botão
        Animated.timing(animValues.buttonPulse, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        // Retorna ao tamanho normal
        Animated.timing(animValues.buttonPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
    
    // Animar indicadores de página
    Animated.timing(animValues.indicatorsOpacity, {
      toValue: 1,
      duration: 800,
      delay: 700,
      useNativeDriver: true,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
    }).start();
  };
  
  return {
    animateBackground,
    animateScreenEntry,
    animateImage,
    animateTexts,
    animateControls,
  };
}; 