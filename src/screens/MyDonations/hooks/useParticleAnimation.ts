import { useRef, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

// Definir dimensões da tela
const { width, height } = Dimensions.get('window');

// Interface para partículas
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  scale: Animated.Value;
  translate: {
    x: Animated.Value;
    y: Animated.Value;
  };
  rotate: Animated.Value;
}

/**
 * Hook que gerencia a animação de partículas em diferentes camadas para criar
 * um efeito de profundidade e movimento na tela
 */
export const useParticleAnimation = () => {
  // Criar partículas em diferentes camadas
  const [backgroundParticles] = useState<Particle[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 2,
      alpha: Math.random() * 0.5 + 0.1,
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
      translate: {
        x: new Animated.Value(0),
        y: new Animated.Value(0),
      },
      rotate: new Animated.Value(0),
    }))
  );
  
  const [middleParticles] = useState<Particle[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 5,
      alpha: Math.random() * 0.4 + 0.2,
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
      translate: {
        x: new Animated.Value(0),
        y: new Animated.Value(0),
      },
      rotate: new Animated.Value(0),
    }))
  );
  
  const [foregroundParticles] = useState<Particle[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 200,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      alpha: Math.random() * 0.3 + 0.1,
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
      translate: {
        x: new Animated.Value(0),
        y: new Animated.Value(0),
      },
      rotate: new Animated.Value(0),
    }))
  );
  
  // Animar partículas individuais
  const animateParticle = (particle: Particle) => {
    // Animar a escala
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.scale, {
          toValue: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 8000 + 3000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.scale, {
          toValue: Math.random() * 0.3 + 0.2,
          duration: Math.random() * 8000 + 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animar a posição X
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.translate.x, {
          toValue: Math.random() * 100 - 50,
          duration: Math.random() * 12000 + 8000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.translate.x, {
          toValue: Math.random() * -100 + 50,
          duration: Math.random() * 12000 + 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animar a posição Y
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.translate.y, {
          toValue: Math.random() * 100 - 50,
          duration: Math.random() * 10000 + 10000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.translate.y, {
          toValue: Math.random() * -100 + 50,
          duration: Math.random() * 10000 + 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animar a rotação
    Animated.loop(
      Animated.timing(particle.rotate, {
        toValue: Math.random() * 4 - 2,
        duration: Math.random() * 20000 + 10000,
        useNativeDriver: true,
      })
    ).start();
  };
  
  // Animar as camadas de partículas com efeito parallax
  const animateParallaxLayers = (
    backgroundParallax: Animated.Value,
    middleLayerParallax: Animated.Value,
    foregroundParallax: Animated.Value
  ) => {
    // Animar a camada de fundo (menor movimento)
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundParallax, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundParallax, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animar a camada do meio (movimento médio)
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayerParallax, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(middleLayerParallax, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animar a camada de frente (maior movimento)
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundParallax, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(foregroundParallax, {
          toValue: 0,
          duration: 10000,
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