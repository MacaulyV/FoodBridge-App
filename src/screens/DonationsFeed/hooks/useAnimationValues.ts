import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para inicializar todos os valores de animação necessários
 */
export const useAnimationValues = () => {
  // Animações de entrada da tela
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(100)).current;
  
  // Animações do gradiente de fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Animações de parallax (camadas de fundo)
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animações de conteúdo
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(-20)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const gridTranslateY = useRef(new Animated.Value(50)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.9)).current;
  
  // Animações de header/navbar
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;
  
  return {
    // Animações de entrada da tela
    screenOpacity,
    screenSlide,
    
    // Animações do gradiente de fundo
    gradientOpacity,
    blurIntensity,
    
    // Animações de parallax
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    
    // Animações de conteúdo
    titleOpacity,
    titleTranslateY,
    searchBarOpacity,
    gridOpacity,
    gridTranslateY,
    cardOpacity,
    cardScale,
    
    // Animações de header/navbar
    navBarOpacity,
    backButtonScale,
  };
}; 