import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para inicializar e retornar todos os valores de animação usados na tela Profile
 */
export const useAnimationValues = () => {
  // Animações para a tela inteira
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(300)).current;
  
  // Animações para o fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Animações para o parallax
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animações para o título
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  
  // Animações para o container principal
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const containerTranslateY = useRef(new Animated.Value(30)).current;
  
  // Animações para o avatar
  const avatarOpacity = useRef(new Animated.Value(0)).current;
  const avatarScale = useRef(new Animated.Value(0.8)).current;
  
  // Animações para as ações
  const actionsOpacity = useRef(new Animated.Value(0)).current;
  const actionsTranslateY = useRef(new Animated.Value(30)).current;
  
  // Animações para o footer
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(20)).current;
  
  // Animações para o navbar inferior
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  
  return {
    screenOpacity,
    screenSlide,
    gradientOpacity,
    blurIntensity,
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    titleOpacity,
    titleTranslateY,
    containerOpacity,
    containerTranslateY,
    avatarOpacity,
    avatarScale,
    actionsOpacity,
    actionsTranslateY,
    footerOpacity,
    footerTranslateY,
    navBarOpacity,
  };
}; 