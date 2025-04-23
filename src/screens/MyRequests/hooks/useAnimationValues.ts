import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook para inicializar os valores de animação
 */
export const useAnimationValues = () => {
  // Opacidade e transição da tela
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(70)).current;
  
  // Animação do gradiente de fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Efeito parallax para camadas de partículas
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animação do título
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(5)).current;
  
  // Animação do subtítulo (separado do título)
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(5)).current;
  
  // Animação da grade de solicitações
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const gridTranslateY = useRef(new Animated.Value(50)).current;
  
  // Animação dos cards
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.85)).current;
  
  // Animação da barra de navegação
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  const navBarBackButtonScale = useRef(new Animated.Value(0.7)).current;
  
  return {
    // Animações da tela
    screenOpacity,
    screenSlide,
    
    // Animações do fundo
    gradientOpacity,
    blurIntensity,
    
    // Efeito parallax
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    
    // Animações do conteúdo
    titleOpacity,
    titleTranslateY,
    subtitleOpacity,
    subtitleTranslateY,
    gridOpacity,
    gridTranslateY,
    cardOpacity,
    cardScale,
    
    // Animações da navbar
    navBarOpacity,
    navBarBackButtonScale,
  };
}; 