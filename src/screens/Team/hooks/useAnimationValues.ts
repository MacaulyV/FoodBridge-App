import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook para inicializar e retornar todos os valores de animação usados na tela Team
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
  
  // Animações para o footer
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(20)).current;
  
  // Animações para o navbar inferior
  const navBarOpacity = useRef(new Animated.Value(0)).current;
  
  // Inicializar arrays vazios para os cartões dos membros da equipe
  const cardOpacity: Animated.Value[] = [];
  const cardScale: Animated.Value[] = [];
  const cardTranslateY: Animated.Value[] = [];
  
  // Armazenar valores de animação para cada card de membro da equipe
  const teamMemberCards = {
    cardOpacity,
    cardScale,
    cardTranslateY,
  };
  
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
    footerOpacity,
    footerTranslateY,
    navBarOpacity,
    teamMemberCards,
  };
}; 