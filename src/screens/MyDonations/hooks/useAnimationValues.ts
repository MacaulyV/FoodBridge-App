import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook que inicializa e retorna todos os valores de animação utilizados na tela
 */
export const useAnimationValues = () => {
  // Animação da tela inteira
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(50)).current;
  
  // Animação do gradiente e blur de fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Animação para efeito parallax das camadas de partículas
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animação do título
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(-20)).current;
  
  // Animação da grade de doações
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const gridTranslateY = useRef(new Animated.Value(30)).current;
  
  // Animação para os cards
  const cardScale = useRef(new Animated.Value(0.9)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  
  // Animação para as barras de navegação
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  const bottomNavBarOpacity = useRef(new Animated.Value(0)).current;
  
  // Animação para o botão de voltar
  const backButtonScale = useRef(new Animated.Value(1)).current;
  
  // Novas animações para entrada espetacular
  const entryRotation = useRef(new Animated.Value(0)).current;
  const entryScale = useRef(new Animated.Value(0.3)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const contentBounce = useRef(new Animated.Value(0)).current;
  
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
    gridOpacity,
    gridTranslateY,
    cardScale,
    cardOpacity,
    navBarOpacity,
    bottomNavBarOpacity,
    backButtonScale,
    // Novos valores para animação espetacular
    entryRotation,
    entryScale,
    flashOpacity,
    contentBounce
  };
}; 