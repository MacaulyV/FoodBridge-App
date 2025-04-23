import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimationValues = () => {
  // Valores para a tela
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const screenSlide = useRef(new Animated.Value(300)).current; // Começa fora da tela (direita)
  
  // Valores para o fundo
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  
  // Valores para as partículas
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Valores para o título
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  
  // Valores para o formulário
  // Criamos arrays de valores animados para cada campo do formulário
  const createAnimatedValues = (count: number, initialOpacity = 0, initialTranslate = 30) => {
    const opacityValues: Animated.Value[] = [];
    const translateYValues: Animated.Value[] = [];
    
    for (let i = 0; i < count; i++) {
      opacityValues.push(new Animated.Value(initialOpacity));
      translateYValues.push(new Animated.Value(initialTranslate));
    }
    
    return { opacityValues, translateYValues };
  };
  
  // Criamos 7 valores para campos de doação (5 originais + imagens + checkbox)
  const { opacityValues: inputsOpacity, translateYValues: inputsTranslateY } = createAnimatedValues(7);
  
  // Valores para o botão de doar
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  
  // Valor para a barra de navegação inferior
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  
  return {
    // Tela
    screenOpacity,
    screenSlide,
    
    // Fundo
    gradientOpacity,
    blurIntensity,
    
    // Partículas
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    
    // Título
    titleOpacity,
    titleTranslateY,
    
    // Campos do formulário
    inputsOpacity,
    inputsTranslateY,
    
    // Botão
    buttonOpacity,
    buttonScale,
    buttonPulse,
    
    // Barra de navegação
    navBarOpacity
  };
}; 