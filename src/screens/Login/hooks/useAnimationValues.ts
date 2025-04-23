import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para inicializar e retornar todos os valores de animação usados na tela
 */
export const useAnimationValues = () => {
  // Animações para a tela inteira
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(50)).current;
  
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
  
  // Animações para os inputs
  const inputsOpacity = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const inputsTranslateY = [
    useRef(new Animated.Value(30)).current,
    useRef(new Animated.Value(30)).current,
  ];
  
  // Animações para o botão de login
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  
  // Animações para os botões sociais
  const socialButtonsOpacity = useRef(new Animated.Value(0)).current;
  const socialButtonsTranslateY = useRef(new Animated.Value(30)).current;
  
  // Animações para o footer
  const footerOpacity = useRef(new Animated.Value(0)).current;
  
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
    inputsOpacity,
    inputsTranslateY,
    buttonOpacity,
    buttonScale,
    buttonPulse,
    socialButtonsOpacity,
    socialButtonsTranslateY,
    footerOpacity,
  };
}; 