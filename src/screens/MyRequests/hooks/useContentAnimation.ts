import { Animated, Easing } from 'react-native';

/**
 * Hook que gerencia as animações de conteúdo da tela
 */
export const useContentAnimation = (animValues: any) => {
  /**
   * Anima a entrada da tela
   */
  const animateScreenEntry = () => {
    Animated.timing(animValues.screenOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic)
    }).start();
    
    Animated.spring(animValues.screenSlide, {
      toValue: 0,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };
  
  /**
   * Anima o gradiente de fundo
   */
  const animateBackground = () => {
    Animated.timing(animValues.gradientOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.cubic)
    }).start();
    
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.cubic)
    }).start();
  };
  
  /**
   * Anima o título da tela
   */
  const animateTitle = () => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.spring(animValues.titleOpacity, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(animValues.titleTranslateY, {
          toValue: 10,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
        
        Animated.sequence([
          Animated.delay(150),
          Animated.parallel([
            Animated.spring(animValues.subtitleOpacity, {
              toValue: 1,
              tension: 45,
              friction: 8,
              useNativeDriver: true,
            }),
            Animated.spring(animValues.subtitleTranslateY, {
              toValue: 5,
              tension: 35,
              friction: 7,
              useNativeDriver: true,
            })
          ])
        ])
      ])
    ]).start();
  };
  
  /**
   * Anima a aparição da grade de solicitações
   */
  const animateGrid = () => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(animValues.gridOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        }),
        Animated.spring(animValues.gridTranslateY, {
          toValue: 0,
          tension: 30,
          friction: 7,
          useNativeDriver: true,
        })
      ])
    ]).start();
  };
  
  /**
   * Anima os cards de solicitações
   */
  const animateCards = () => {
    Animated.sequence([
      Animated.delay(700),
      Animated.parallel([
        Animated.spring(animValues.cardOpacity, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(animValues.cardScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ])
    ]).start();
  };
  
  /**
   * Anima a NavBar
   */
  const animateNavBar = () => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(animValues.navBarOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        }),
        Animated.spring(animValues.navBarBackButtonScale, {
          toValue: 1,
          tension: 80,
          friction: 7,
          useNativeDriver: true,
        })
      ])
    ]).start();
  };
  
  /**
   * Anima a saída da tela
   */
  const animateScreenExit = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic)
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: -70,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic)
      })
    ]).start(callback);
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateGrid,
    animateCards,
    animateNavBar,
    animateScreenExit
  };
}; 