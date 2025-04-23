import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ParticleData } from '../types';

const { width, height } = Dimensions.get('window');

// Função para criar valores aleatórios
const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const useParticleAnimation = () => {
  // Criar partículas para a camada de fundo
  const createParticles = (
    count: number, 
    type: 'background' | 'middle' | 'foreground'
  ): ParticleData[] => {
    const particles: ParticleData[] = [];
    
    // Fatores de escala e velocidade baseados na camada
    const scaleFactor = type === 'background' ? 0.5 : type === 'middle' ? 0.7 : 0.9;
    const speedFactor = type === 'background' ? 0.3 : type === 'middle' ? 0.6 : 1;
    const opacityMax = type === 'background' ? 0.3 : type === 'middle' ? 0.5 : 0.7;
    
    for (let i = 0; i < count; i++) {
      const particleType = Math.random() > 0.7 
        ? 'circle' 
        : Math.random() > 0.5 
          ? 'star' 
          : 'dot';
          
      const delay = randomBetween(0, 2000);
      const duration = randomBetween(15000, 25000);
      const initialX = randomBetween(0, width);
      const initialY = randomBetween(0, height);
      const initialScale = randomBetween(0.2, 0.8) * scaleFactor;
      
      particles.push({
        opacity: new Animated.Value(0),
        translateX: new Animated.Value(initialX),
        translateY: new Animated.Value(initialY),
        scale: new Animated.Value(initialScale),
        rotate: new Animated.Value(0),
        type: particleType,
        speedFactor: randomBetween(0.5, 1.5) * speedFactor,
        opacityFactor: randomBetween(0.3, opacityMax),
        delay,
        duration,
        initialY,
        initialScale,
      });
    }
    
    return particles;
  };
  
  // Criar partículas para cada camada - reduzindo a quantidade
  const backgroundParticles = useRef(createParticles(12, 'background')).current;
  const middleParticles = useRef(createParticles(8, 'middle')).current;
  const foregroundParticles = useRef(createParticles(5, 'foreground')).current;
  
  // Animar uma partícula individual
  const animateParticle = (particle: ParticleData) => {
    // Aparece com fade in
    Animated.timing(particle.opacity, {
      toValue: particle.opacityFactor,
      duration: 2000,
      delay: particle.delay,
      useNativeDriver: true,
    }).start();
    
    // Movimento flutuante contínuo
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.translateY, {
          toValue: particle.initialY - randomBetween(30, 80) * particle.speedFactor,
          duration: particle.duration,
          delay: particle.delay,
          useNativeDriver: true,
        }),
        Animated.timing(particle.translateY, {
          toValue: particle.initialY + randomBetween(30, 80) * particle.speedFactor,
          duration: particle.duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Rotação suave (se for estrela)
    if (particle.type === 'star') {
      Animated.loop(
        Animated.timing(particle.rotate, {
          toValue: 1,
          duration: randomBetween(20000, 40000),
          useNativeDriver: true,
        })
      ).start();
    }
    
    // Escala pulsante leve
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.scale, {
          toValue: particle.initialScale * 1.2,
          duration: randomBetween(2000, 4000),
          useNativeDriver: true,
        }),
        Animated.timing(particle.scale, {
          toValue: particle.initialScale * 0.8,
          duration: randomBetween(2000, 4000),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  // Animar o efeito parallax nas camadas
  const animateParallaxLayers = (
    backgroundValue: Animated.Value,
    middleValue: Animated.Value,
    foregroundValue: Animated.Value
  ) => {
    // Animação contínua de parallax para a camada de fundo
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundValue, {
          toValue: 30,
          duration: 30000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundValue, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundValue, {
          toValue: -30,
          duration: 30000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundValue, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animação para a camada do meio (mais rápida)
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleValue, {
          toValue: 20,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(middleValue, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(middleValue, {
          toValue: -20,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(middleValue, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animação para a camada da frente (mais rápida)
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundValue, {
          toValue: 15,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(foregroundValue, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(foregroundValue, {
          toValue: -15,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(foregroundValue, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
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