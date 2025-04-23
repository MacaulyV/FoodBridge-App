import { Animated } from 'react-native';

/**
 * Hook que gerencia a animação do conteúdo da tela MyDonations
 */
export const useContentAnimation = (animValues: any) => {
  // Animar a entrada da tela (fade in e slide)
  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 1600,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar o fundo com gradiente
  const animateBackground = () => {
    Animated.stagger(150, [
      Animated.timing(animValues.gradientOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: false,
      }),
      Animated.timing(animValues.blurIntensity, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  // Animar o título da tela
  const animateTitle = () => {
    Animated.stagger(150, [
      Animated.timing(animValues.titleOpacity, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.titleTranslateY, {
        toValue: 0,
        duration: 1700,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar a grade de cards
  const animateGrid = () => {
    Animated.stagger(150, [
      Animated.timing(animValues.gridOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.gridTranslateY, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar os cards
  const animateCards = () => {
    Animated.stagger(100, [
      Animated.timing(animValues.cardOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.cardScale, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar as barras de navegação
  const animateNavBar = () => {
    Animated.timing(animValues.navBarOpacity, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();
  };
  
  // Animar botão de voltar quando pressionado
  const animateButtonPress = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar a saída da tela
  const animateScreenExit = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateGrid,
    animateCards,
    animateNavBar,
    animateButtonPress,
    animateScreenExit,
  };
}; 