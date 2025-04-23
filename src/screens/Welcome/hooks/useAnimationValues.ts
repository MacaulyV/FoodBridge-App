import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

/**
 * Hook para inicializar e gerenciar todos os valores de animação 
 * usados na tela de boas-vindas
 */
export const useAnimationValues = () => {
  // Dimensões da tela
  const { width, height } = Dimensions.get('window');
  
  // Referências para animações - sistema principal
  const mainScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0.7)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const screenSlide = useRef(new Animated.Value(0)).current;
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const circleGlow = useRef(new Animated.Value(0)).current;
  
  // Animação da borda progressiva
  const borderProgress = useRef(new Animated.Value(0)).current;
  
  // Animação do gradiente
  const gradientPosition = useRef(new Animated.Value(0)).current;
  const gradientColors = useRef(new Animated.Value(0)).current;
  
  // Efeito parallax para profundidade - diferentes velocidades para camadas
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animações adicionais para o título e subtítulo
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(15)).current;
  
  // Animações para o botão e indicadores de página
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const pageIndicatorsOpacity = useRef(new Animated.Value(0)).current;
  
  // Animação do gradiente do botão
  const buttonGradientPosition = useRef(new Animated.Value(0)).current;
  
  // Animação do botão
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonPulse = useRef(new Animated.Value(0)).current;
  
  return {
    // Dimensões
    width,
    height,
    
    // Animações principais
    mainScale,
    logoOpacity,
    screenOpacity,
    screenSlide,
    gradientOpacity,
    blurIntensity,
    logoRotate,
    circleGlow,
    borderProgress,
    
    // Animações do gradiente
    gradientPosition,
    gradientColors,
    
    // Efeito parallax
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    
    // Animações de texto
    titleOpacity,
    titleTranslateY,
    subtitleOpacity,
    subtitleTranslateY,
    
    // Animações de navegação
    buttonOpacity,
    buttonTranslateY,
    pageIndicatorsOpacity,
    buttonGradientPosition,
    buttonScale,
    buttonPulse,
  };
}; 