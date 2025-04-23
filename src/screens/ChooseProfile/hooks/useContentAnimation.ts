import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar as animações de conteúdo da tela
 */
export const useContentAnimation = (animValues: any) => {
  // Animar entrada da tela
  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
    ]).start();
  };
  
  // Animar o fundo
  const animateBackground = () => {
    Animated.parallel([
      Animated.timing(animValues.gradientOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
      Animated.timing(animValues.blurIntensity, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      }),
    ]).start();
  };
  
  // Animar título
  const animateTitle = () => {
    Animated.parallel([
      Animated.timing(animValues.titleOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 300,
      }),
      Animated.timing(animValues.titleTranslateY, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 300,
      }),
    ]).start();
  };
  
  // Animar opções de perfil
  const animateProfileOptions = () => {
    Animated.parallel([
      // Container
      Animated.timing(animValues.containerOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 600,
      }),
      Animated.timing(animValues.containerTranslateY, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 600,
      }),
      
      // Opção de doação
      Animated.timing(animValues.donateOptionOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 800,
      }),
      Animated.timing(animValues.donateOptionScale, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 800,
      }),
      
      // Opção de recebimento
      Animated.timing(animValues.receiveOptionOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 1000,
      }),
      Animated.timing(animValues.receiveOptionScale, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
        delay: 1000,
      }),
    ]).start();
  };
  
  // Animar imagem
  const animateImage = () => {
    const animationDelay = 2500;
    
    Animated.sequence([
      Animated.delay(animationDelay),
      
      Animated.parallel([
        Animated.timing(animValues.imageOpacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1),
        }),
        Animated.timing(animValues.imageScale, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.bezier(0.33, 1, 0.68, 1),
        }),
        Animated.timing(animValues.imageTranslateY, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      ])
    ]).start();
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateProfileOptions,
    animateImage,
  };
}; 