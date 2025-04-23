import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ParticleData } from '../types';

export const useParticleAnimation = () => {
  const { width, height } = Dimensions.get('window');
  
  // Criar uma partícula com valores aleatórios
  const createParticle = (type: 'circle' | 'star' | 'dot'): ParticleData => {
    const randomX = Math.random() * width;
    const randomY = Math.random() * height * 1.5;
    const randomScale = 0.3 + Math.random() * 0.7;
    const randomSpeedFactor = 0.5 + Math.random() * 1.5;
    const randomOpacityFactor = 0.3 + Math.random() * 0.7;
    const randomDelay = Math.random() * 1000;
    const randomDuration = 5000 + Math.random() * 15000;
    
    return {
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(randomX),
      translateY: new Animated.Value(randomY),
      scale: new Animated.Value(randomScale),
      rotate: new Animated.Value(0),
      type,
      speedFactor: randomSpeedFactor,
      opacityFactor: randomOpacityFactor,
      delay: randomDelay,
      duration: randomDuration,
      initialY: randomY,
      initialScale: randomScale,
    };
  };
  
  // Criar partículas para diferentes camadas
  const createParticles = (count: number, type: 'circle' | 'star' | 'dot'): ParticleData[] => {
    const particles: ParticleData[] = [];
    
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(type));
    }
    
    return particles;
  };
  
  // Criar partículas para cada camada
  const backgroundParticles = createParticles(15, 'circle');
  const middleParticles = createParticles(10, 'star');
  const foregroundParticles = createParticles(5, 'dot');
  
  // Animar uma partícula
  const animateParticle = (particle: ParticleData) => {
    // Resetar a posição Y antes de iniciar a animação
    particle.translateY.setValue(particle.initialY + (Math.random() * 200));
    
    // Sequência de animações para partículas
    const fadeIn = Animated.timing(particle.opacity, {
      toValue: particle.opacityFactor,
      duration: 1000,
      delay: particle.delay,
      useNativeDriver: true,
    });
    
    const moveUp = Animated.timing(particle.translateY, {
      toValue: -100, // Mover para cima, para fora da tela
      duration: particle.duration * particle.speedFactor,
      delay: particle.delay,
      useNativeDriver: true,
    });
    
    const rotate = Animated.timing(particle.rotate, {
      toValue: 1, // Um valor de 1 representa uma rotação completa
      duration: particle.duration * 1.5,
      delay: particle.delay,
      useNativeDriver: true,
    });
    
    const fadeOut = Animated.timing(particle.opacity, {
      toValue: 0,
      duration: 1000,
      delay: particle.duration * 0.7, // Começar a desvanecer quando estiver próximo do topo
      useNativeDriver: true,
    });
    
    // Executar todas as animações em paralelo
    Animated.parallel([fadeIn, moveUp, rotate, fadeOut]).start(() => {
      // Quando a animação terminar, reiniciar a partícula
      setTimeout(() => animateParticle(particle), Math.random() * 1000);
    });
  };
  
  // Animar o efeito parallax
  const animateParallaxLayers = (
    background: Animated.Value,
    middle: Animated.Value,
    foreground: Animated.Value
  ) => {
    // Animar cada camada com velocidade diferente
    Animated.loop(
      Animated.sequence([
        Animated.timing(background, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(background, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(middle, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(middle, {
          toValue: 0,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(foreground, {
          toValue: 1,
          duration: 16000,
          useNativeDriver: true,
        }),
        Animated.timing(foreground, {
          toValue: 0,
          duration: 16000,
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