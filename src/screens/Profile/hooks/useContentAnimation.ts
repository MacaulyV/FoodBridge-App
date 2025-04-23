import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';

// Ativar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Easings personalizados para animações mais orgânicas
const springEasing = Easing.bezier(0.43, 0.28, 0.23, 0.99);
const cinematic = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const popEasing = Easing.bezier(0.34, 1.56, 0.64, 1);

/**
 * Hook para gerenciar as animações do conteúdo da tela com interações avançadas
 */
export const useContentAnimation = (animValues: any) => {
  // Animar o gradiente e outros elementos de fundo com efeito parallax
  const animateBackground = () => {
    Animated.timing(animValues.gradientOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing: cinematic,
    }).start();
    
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
      easing: cinematic,
    }).start();
  };
  
  // Animar a entrada da tela inteira com transição cinematográfica
  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: cinematic,
      }),
      
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
        easing: springEasing,
      })
    ]).start();
  };
  
  // Animar o título com movimento orgânico
  const animateTitle = () => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(animValues.titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.titleTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o container de informações do perfil
  const animateProfileContainer = () => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(animValues.containerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.containerTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o avatar com efeito pop
  const animateAvatar = () => {
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(animValues.avatarOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.avatarScale, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar as ações do perfil
  const animateActions = () => {
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(animValues.actionsOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.actionsTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o footer com movimento fluido
  const animateFooter = () => {
    Animated.sequence([
      Animated.delay(700),
      Animated.parallel([
        Animated.timing(animValues.footerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.footerTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o navbar inferior com aparição suave
  const animateNavBar = () => {
    Animated.sequence([
      Animated.delay(800),
      Animated.spring(animValues.navBarOpacity, {
        toValue: 1,
        friction: 10,
        tension: 20,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar botão quando pressionado
  const animateButtonPress = (scale: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: popEasing,
      }),
    ]).start(callback);
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateProfileContainer,
    animateAvatar,
    animateActions,
    animateFooter,
    animateNavBar,
    animateButtonPress,
  };
}; 