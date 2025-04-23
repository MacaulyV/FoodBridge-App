import { useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { ParticleData } from '../types';

/**
 * Hook para gerenciar as animações do sistema de partículas
 */
export const useParticleAnimation = () => {
  const { width, height } = Dimensions.get('window');
  
  // Cria um conjunto de partículas com posições e propriedades randomicas
  const createParticles = (count: number, zIndex: number): ParticleData[] => {
    return Array(count).fill(0).map(() => {
      const speedFactor = Math.random() * 0.5 + 0.5;
      const opacityFactor = Math.random() * 0.5 + 0.3;
      const delay = Math.random() * 2000;
      const duration = Math.random() * 15000 + 15000;
      const type = Math.random() > 0.7 
        ? 'circle' 
        : Math.random() > 0.5 
          ? 'star' 
          : 'dot';
      
      return {
        opacity: new Animated.Value(0),
        translateX: new Animated.Value(Math.random() * width),
        translateY: new Animated.Value(Math.random() * height),
        scale: new Animated.Value(0.3 + Math.random() * 0.7),
        rotate: new Animated.Value(0),
        type,
        speedFactor,
        opacityFactor,
        delay,
        duration,
      };
    });
  };
  
  // Criar conjuntos de partículas para diferentes camadas
  const backgroundParticles = useRef(createParticles(10, 1)).current;
  const middleParticles = useRef(createParticles(8, 2)).current;
  const foregroundParticles = useRef(createParticles(6, 3)).current;
  
  // Animar uma partícula individual
  const animateParticle = (particle: ParticleData) => {
    const { opacity, translateX, translateY, scale, rotate, delay, duration, speedFactor, opacityFactor } = particle;
    const { width, height } = Dimensions.get('window');
    
    // Animar opacidade
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: opacityFactor,
        duration: 1500,
        delay,
        useNativeDriver: true,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        delay: duration - 1500,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }),
    ]).start(() => animateParticle(particle));
    
    // Animar posição
    Animated.timing(translateY, {
      toValue: Math.random() * height,
      duration: duration * speedFactor,
      delay,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    }).start();
    
    Animated.timing(translateX, {
      toValue: Math.random() * width,
      duration: duration * speedFactor,
      delay,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    }).start();
    
    // Animar escala
    Animated.timing(scale, {
      toValue: 0.3 + Math.random() * 0.7,
      duration: duration * 0.5,
      delay,
      useNativeDriver: true,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
    }).start();
    
    // Animar rotação
    Animated.timing(rotate, {
      toValue: 1,
      duration: duration,
      delay,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      rotate.setValue(0);
    });
  };
  
  // Animar o efeito parallax nas diferentes camadas
  const animateParallaxLayers = (
    backgroundParallax: Animated.Value,
    middleLayerParallax: Animated.Value,
    foregroundParallax: Animated.Value,
  ) => {
    // Parallax suave para o fundo
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundParallax, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(backgroundParallax, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
    
    // Parallax para a camada do meio
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayerParallax, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(middleLayerParallax, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
      ])
    ).start();
    
    // Parallax para a camada da frente
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundParallax, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        Animated.timing(foregroundParallax, {
          toValue: 0,
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