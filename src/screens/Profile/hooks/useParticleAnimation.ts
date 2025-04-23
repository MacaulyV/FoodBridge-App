import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

// Obter dimensões da tela
const { width, height } = Dimensions.get('window');

// Interface para partícula
interface Particle {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  size: number;
  opacity: Animated.Value;
  speed: number;
  initialX: number;
  initialY: number;
}

/**
 * Hook para gerenciar animações de partículas com efeito parallax
 */
export const useParticleAnimation = () => {
  // Gerar posição aleatória para partículas
  const generateRandomPosition = () => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
    };
  };
  
  // Gerar tamanho aleatório para partículas
  const generateRandomSize = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };
  
  // Gerar velocidade aleatória
  const generateRandomSpeed = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };
  
  // Gerar partículas para camada de fundo
  const generateParticles = (count: number, sizeRange: [number, number], opacityRange: [number, number], speedRange: [number, number]): Particle[] => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const position = generateRandomPosition();
      const size = generateRandomSize(sizeRange[0], sizeRange[1]);
      const speed = generateRandomSpeed(speedRange[0], speedRange[1]);
      const opacityValue = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
      
      particles.push({
        id: i,
        x: new Animated.Value(position.x),
        y: new Animated.Value(position.y),
        size,
        opacity: new Animated.Value(opacityValue),
        speed,
        initialX: position.x,
        initialY: position.y,
      });
    }
    
    return particles;
  };
  
  // Criar partículas para cada camada
  const backgroundParticles = generateParticles(15, [1.5, 3], [0.1, 0.2], [0.1, 0.3]);
  const middleParticles = generateParticles(10, [2, 4], [0.15, 0.25], [0.2, 0.4]);
  const foregroundParticles = generateParticles(5, [3, 5], [0.2, 0.3], [0.3, 0.5]);
  
  // Animar uma única partícula
  const animateParticle = (particle: Particle) => {
    // Animar movimento vertical
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.y, {
          toValue: particle.initialY + (10 + Math.random() * 20) * particle.speed,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          easing: (t) => Math.sin(t * Math.PI),
        }),
        Animated.timing(particle.y, {
          toValue: particle.initialY,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
          easing: (t) => Math.sin(t * Math.PI),
        }),
      ])
    ).start();
    
    // Animar opacidade com pulsação suave
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.opacity, {
          toValue: Math.max(0.05, particle.opacity._value - 0.1),
          duration: 1500 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.opacity, {
          toValue: Math.min(0.3, particle.opacity._value + 0.1),
          duration: 1500 + Math.random() * 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  // Valores para animação parallax
  const backgroundParallax = useRef(new Animated.Value(0)).current;
  const middleLayerParallax = useRef(new Animated.Value(0)).current;
  const foregroundParallax = useRef(new Animated.Value(0)).current;
  
  // Animar camadas para efeito parallax
  const animateParallaxLayers = (
    background: Animated.Value,
    middle: Animated.Value,
    foreground: Animated.Value
  ) => {
    // Loop para fundo
    Animated.loop(
      Animated.sequence([
        Animated.timing(background, {
          toValue: 10,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(background, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(background, {
          toValue: -10,
          duration: 20000,
          useNativeDriver: true,
        }),
        Animated.timing(background, {
          toValue: 0,
          duration: 20000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Loop para camada média (mais rápido)
    Animated.loop(
      Animated.sequence([
        Animated.timing(middle, {
          toValue: 20,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(middle, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(middle, {
          toValue: -20,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(middle, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Loop para primeiro plano (mais rápido ainda)
    Animated.loop(
      Animated.sequence([
        Animated.timing(foreground, {
          toValue: 30,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(foreground, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(foreground, {
          toValue: -30,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(foreground, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  // Definir valores finais sem animar (para casos de retorno à tela)
  const setFinalParticleValues = () => {
    // Apenas garantir que as partículas tenham valores de opacidade corretos
    backgroundParticles.forEach(particle => {
      particle.opacity.setValue(0.1 + Math.random() * 0.1);
    });
    
    middleParticles.forEach(particle => {
      particle.opacity.setValue(0.15 + Math.random() * 0.1);
    });
    
    foregroundParticles.forEach(particle => {
      particle.opacity.setValue(0.2 + Math.random() * 0.1);
    });
  };
  
  return {
    backgroundParticles,
    middleParticles,
    foregroundParticles,
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax,
    animateParticle,
    animateParallaxLayers,
    setFinalParticleValues,
  };
}; 