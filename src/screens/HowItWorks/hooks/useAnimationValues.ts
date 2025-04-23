import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para inicializar todos os valores de animação usados na tela
 */
export const useAnimationValues = () => {
  // Animações de entrada da tela
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(300)).current;
  
  // Animações para o fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Animações para as partículas
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animações para a imagem ilustrativa
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.9)).current;
  const imageTranslateY = useRef(new Animated.Value(-150)).current;
  
  // Animações para o título e descrição
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const descriptionTranslateY = useRef(new Animated.Value(20)).current;
  
  // Animações para o botão e indicadores
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  const indicatorsOpacity = useRef(new Animated.Value(0)).current;
  
  return {
    screenOpacity,
    screenSlide,
    gradientOpacity,
    blurIntensity,
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    imageOpacity,
    imageScale,
    imageTranslateY,
    titleOpacity,
    titleTranslateY,
    descriptionOpacity,
    descriptionTranslateY,
    buttonOpacity,
    buttonScale,
    buttonTranslateY,
    buttonPulse,
    indicatorsOpacity,
  };
}; 