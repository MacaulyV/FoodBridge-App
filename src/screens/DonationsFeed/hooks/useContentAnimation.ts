import { Animated } from 'react-native';

/**
 * Hook para gerenciar as animações de conteúdo da tela
 */
export const useContentAnimation = (animValues: any) => {
  // Animar entrada da tela
  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Animar o fundo da tela
  const animateBackground = () => {
    Animated.timing(animValues.gradientOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
    
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };
  
  // Animar o título da tela
  const animateTitle = () => {
    Animated.parallel([
      Animated.timing(animValues.titleOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true
      }),
      Animated.timing(animValues.titleTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Animar a barra de busca
  const animateSearchBar = () => {
    Animated.timing(animValues.searchBarOpacity, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true
    }).start();
  };
  
  // Animar o grid de conteúdo
  const animateGrid = () => {
    Animated.parallel([
      Animated.timing(animValues.gridOpacity, {
        toValue: 1,
        duration: 700,
        delay: 300,
        useNativeDriver: true
      }),
      Animated.timing(animValues.gridTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 300,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Animar os cards de doação
  const animateCards = () => {
    Animated.parallel([
      Animated.timing(animValues.cardOpacity, {
        toValue: 1,
        duration: 500,
        delay: 400,
        useNativeDriver: true
      }),
      Animated.timing(animValues.cardScale, {
        toValue: 1,
        duration: 500,
        delay: 400,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Animar a barra de navegação
  const animateNavBar = () => {
    Animated.timing(animValues.navBarOpacity, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true
    }).start();
  };
  
  // Animar o pressionamento de botões
  const animateButtonPress = (buttonScale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateSearchBar,
    animateGrid,
    animateCards,
    animateNavBar,
    animateButtonPress
  };
}; 