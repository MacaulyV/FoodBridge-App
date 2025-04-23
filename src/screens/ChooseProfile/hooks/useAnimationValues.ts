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
  
  // Animações para as opções de perfil
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const containerTranslateY = useRef(new Animated.Value(30)).current;
  
  // Animações para a opção de doação
  const donateOptionOpacity = useRef(new Animated.Value(0)).current;
  const donateOptionScale = useRef(new Animated.Value(0.9)).current;
  
  // Animações para a opção de recebimento
  const receiveOptionOpacity = useRef(new Animated.Value(0)).current;
  const receiveOptionScale = useRef(new Animated.Value(0.9)).current;
  
  // Animações para a imagem
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageTranslateY = useRef(new Animated.Value(100)).current;
  
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
    donateOptionOpacity,
    donateOptionScale,
    receiveOptionOpacity,
    receiveOptionScale,
    imageOpacity,
    imageScale,
    imageTranslateY,
  };
}; 