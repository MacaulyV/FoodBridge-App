import { Animated, Easing } from 'react-native';
import { customEasings } from '../../../utils/animations';

interface AnimationValues {
  mainScale: Animated.Value;
  logoOpacity: Animated.Value;
  logoRotate: Animated.Value;
  borderProgress: Animated.Value;
  circleGlow: Animated.Value;
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
  gradientPosition: Animated.Value;
  gradientColors: Animated.Value;
}

/**
 * Hook para gerenciar todas as animações relacionadas ao logo e gradientes
 */
export const useLogoAnimation = (animValues: AnimationValues) => {
  // Animação do gradiente
  const animateGradient = () => {
    // Transição suave entre posições do gradiente
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValues.gradientPosition, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(animValues.gradientPosition, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false
        })
      ])
    ).start();
    
    // Transição suave entre tons do gradiente
    Animated.loop(
      Animated.timing(animValues.gradientColors, {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ).start();
  };

  // Efeito de brilho pulsante no círculo branco
  const animateCircleGlow = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValues.circleGlow, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.sin),
          useNativeDriver: false
        }),
        Animated.timing(animValues.circleGlow, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.in(Easing.sin),
          useNativeDriver: false
        })
      ])
    ).start();
  };

  // Nova animação da borda progressiva com velocidade ajustada
  const animateBorderProgress = () => {
    // Duração aumentada para 4000ms para sincronizar com as outras animações
    Animated.timing(animValues.borderProgress, {
      toValue: 1,
      duration: 4000, 
      easing: Easing.out(Easing.linear),
      useNativeDriver: true
    }).start();
  };

  // Animação principal do logo
  const animateLogo = () => {
    // Começar a animação do logo imediatamente
    Animated.timing(animValues.mainScale, {
      toValue: 1.34, 
      duration: 4000, // Ajustado para 4000ms para sincronizar com a borda
      easing: customEasings.cinematic,
      useNativeDriver: true
    }).start();
    
    // Opacidade do logo
    Animated.timing(animValues.logoOpacity, {
      toValue: 1,
      duration: 1600,
      easing: customEasings.softInOut,
      useNativeDriver: true
    }).start();
    
    // Pequena rotação inicial para o logo
    Animated.sequence([
      Animated.timing(animValues.logoRotate, {
        toValue: -0.05, // Rotação sutil para esquerda
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(animValues.logoRotate, {
        toValue: 0.05, // Rotação sutil para direita
        duration: 800,
        easing: customEasings.softInOut,
        useNativeDriver: true
      }),
      Animated.timing(animValues.logoRotate, {
        toValue: 0, // Retorno à posição normal
        duration: 500,
        easing: customEasings.decelerate,
        useNativeDriver: true
      })
    ]).start();
  };

  // Animar gradiente de fundo
  const animateBackground = () => {
    // Animar o gradiente com transição suave
    Animated.sequence([
      Animated.timing(animValues.gradientOpacity, {
        toValue: 0.7,
        duration: 800,
        easing: customEasings.softInOut,
        useNativeDriver: true
      }),
      Animated.timing(animValues.gradientOpacity, {
        toValue: 1,
        duration: 1200,
        easing: customEasings.decelerate,
        useNativeDriver: true
      })
    ]).start();
    
    // Animar o blur do fundo com transição
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 3000,
      easing: customEasings.softInOut,
      useNativeDriver: false,
    }).start();
  };

  // Função para definir valores finais do logo sem animação
  const setFinalLogoValues = () => {
    // Definir escala final do logo
    animValues.mainScale.setValue(1.34);
    
    // Definir opacidade final do logo
    animValues.logoOpacity.setValue(1);
    
    // Definir rotação final do logo
    animValues.logoRotate.setValue(0);
    
    // Definir progresso da borda como completo
    animValues.borderProgress.setValue(1);
    
    // Definir valores de gradiente
    animValues.gradientOpacity.setValue(1);
    animValues.blurIntensity.setValue(1);
  };

  return {
    animateGradient,
    animateCircleGlow,
    animateBorderProgress,
    animateLogo,
    animateBackground,
    setFinalLogoValues
  };
}; 