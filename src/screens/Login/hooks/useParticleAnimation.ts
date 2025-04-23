import { useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { ParticleData } from '../types';

/**
 * Hook para criar e animar as partículas de fundo
 */
export const useParticleAnimation = () => {
  // Dimensões da tela para posicionar as partículas
  const { width, height } = Dimensions.get('window');
  
  /**
   * Função auxiliar para criar partículas em camadas
   */
  const createParticles = (count: number, zIndex: number): ParticleData[] => {
    const particles: ParticleData[] = [];
    
    for (let i = 0; i < count; i++) {
      // Para variar o movimento e aparência das partículas
      const speedFactor = Math.random() * 0.7 + 0.3; // Valor entre 0.3 e 1.0
      const opacityFactor = Math.random() * 0.5 + 0.5; // Valor entre 0.5 e 1.0
      const delay = Math.random() * 1000; // Delay aleatório para cada partícula
      const duration = 5000 + Math.random() * 10000; // Duração entre 5s e 15s
      
      // Escolher aleatoriamente entre os três tipos de partículas
      const particleTypes: ('circle' | 'star' | 'dot')[] = ['circle', 'star', 'dot'];
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      // Criar partícula com valores animados
      particles.push({
        opacity: new Animated.Value(0),
        translateX: new Animated.Value(Math.random() * width),
        translateY: new Animated.Value(Math.random() * height),
        scale: new Animated.Value(0.1 + Math.random() * 0.4), // Tamanho entre 0.1 e 0.5
        rotate: new Animated.Value(0),
        type,
        speedFactor,
        opacityFactor,
        delay,
        duration,
      });
    }
    
    return particles;
  };
  
  // Criar partículas para cada camada
  const backgroundParticles = useRef(createParticles(15, 1)).current;
  const middleParticles = useRef(createParticles(10, 2)).current;
  const foregroundParticles = useRef(createParticles(5, 3)).current;
  
  /**
   * Função para animar uma partícula individual
   */
  const animateParticle = (particle: ParticleData) => {
    // Resetar posição Y para começar de baixo
    particle.translateY.setValue(height + 20);
    
    // Animação de aparecimento da partícula
    Animated.timing(particle.opacity, {
      toValue: 0.1 * particle.opacityFactor,
      duration: 1000,
      delay: particle.delay,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start();
    
    // Animação de movimento da partícula
    Animated.loop(
      Animated.timing(particle.translateY, {
        toValue: -50, // Mover para cima além do topo da tela
        duration: particle.duration / particle.speedFactor, // Velocidades diferentes
        delay: particle.delay,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
    
    // Animação de rotação
    Animated.loop(
      Animated.timing(particle.rotate, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };
  
  /**
   * Função para animar o efeito de parallax nas camadas
   */
  const animateParallaxLayers = (
    backgroundParallax: Animated.Value,
    middleLayerParallax: Animated.Value,
    foregroundParallax: Animated.Value,
  ) => {
    // Animação suave de ida e volta para cada camada
    Animated.loop(
      Animated.sequence([
        // Camada de fundo se move lentamente
        Animated.timing(backgroundParallax, {
          toValue: 10,
          duration: 20000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(backgroundParallax, {
          toValue: -10,
          duration: 20000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
    
    // Camada do meio se move um pouco mais rápido
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayerParallax, {
          toValue: 20,
          duration: 15000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(middleLayerParallax, {
          toValue: -20,
          duration: 15000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
    
    // Camada da frente se move mais rápido
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundParallax, {
          toValue: 30,
          duration: 10000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(foregroundParallax, {
          toValue: -30,
          duration: 10000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
  };
  
  return {
    backgroundParticles,
    middleParticles,
    foregroundParticles,
    animateParticle,
    animateParallaxLayers,
  };
}; 