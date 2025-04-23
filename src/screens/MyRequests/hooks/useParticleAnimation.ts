import { useState, useCallback } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { Particle } from '../components/ParticleSystem';

/**
 * Hook para gerenciar partículas e suas animações
 */
export const useParticleAnimation = () => {
  const { width, height } = Dimensions.get('window');
  
  // Gerador de cores aleatórias suaves
  const getRandomColor = () => {
    const colors = [
      'rgba(18, 176, 91, 0.15)',  // Verde (cor primária do FoodBridge)
      'rgba(34, 139, 34, 0.12)',  // Verde floresta
      'rgba(143, 188, 143, 0.1)', // Verde mar
      'rgba(60, 179, 113, 0.12)', // Verde médio
      'rgba(46, 139, 87, 0.15)',  // Verde mar
      'rgba(50, 205, 50, 0.08)',  // Lima
      'rgba(154, 205, 50, 0.1)',  // Verde amarelado
      'rgba(71, 131, 192, 0.12)', // Azul (para combinar com o tema)
      'rgba(30, 80, 120, 0.08)',  // Azul escuro
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Criar uma nova partícula com valores aleatórios
  const createParticle = (id: number, scale = 1.0): Particle => {
    // Fator de profundidade para afastar as partículas na inicialização
    const depthFactor = Math.random() * 0.6 + 0.4;
    
    return {
      id,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      scale: new Animated.Value((0.2 + Math.random() * 0.8 * scale) * depthFactor),
      opacity: new Animated.Value(0), // Começam invisíveis para fade-in
      rotateZ: new Animated.Value(Math.random() * 360), // Ângulo inicial aleatório
      color: getRandomColor()
    };
  };
  
  // Inicialização das partículas
  const [backgroundParticles] = useState<Particle[]>(
    Array(18).fill(0).map((_, i) => createParticle(i, 0.6))
  );
  
  const [middleParticles] = useState<Particle[]>(
    Array(12).fill(0).map((_, i) => createParticle(i + 100, 0.8))
  );
  
  const [foregroundParticles] = useState<Particle[]>(
    Array(6).fill(0).map((_, i) => createParticle(i + 200, 1.0))
  );
  
  // Animar uma única partícula
  const animateParticle = useCallback((particle: Particle) => {
    // Fade in inicial
    Animated.timing(particle.opacity, {
      toValue: 0.1 + Math.random() * 0.5,
      duration: 2000 + Math.random() * 3000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.cubic)
    }).start();
    
    // Animação do movimento vertical com oscilações aleatórias
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.y, {
          toValue: Math.random() * height,
          duration: 12000 + Math.random() * 18000,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        Animated.timing(particle.y, {
          toValue: Math.random() * height,
          duration: 12000 + Math.random() * 18000,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
      ])
    ).start();
    
    // Animação do movimento horizontal com oscilações
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.x, {
          toValue: Math.random() * width,
          duration: 15000 + Math.random() * 25000,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
        Animated.timing(particle.x, {
          toValue: Math.random() * width,
          duration: 15000 + Math.random() * 25000,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1)
        }),
      ])
    ).start();
    
    // Animação de rotação
    Animated.loop(
      Animated.timing(particle.rotateZ, {
        toValue: 360 * (Math.random() > 0.5 ? 1 : -1), // Direção aleatória
        duration: 25000 + Math.random() * 35000,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ).start();
    
    // Animação de escala (pulsação suave)
    const baseScale = particle.scale._value;
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.scale, {
          toValue: baseScale * (0.85 + Math.random() * 0.3),
          duration: 6000 + Math.random() * 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(particle.scale, {
          toValue: baseScale * (1.0 + Math.random() * 0.3),
          duration: 6000 + Math.random() * 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
      ])
    ).start();
    
    // Animação de opacidade
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.opacity, {
          toValue: 0.15 + Math.random() * 0.25,
          duration: 3000 + Math.random() * 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(particle.opacity, {
          toValue: 0.3 + Math.random() * 0.3,
          duration: 3000 + Math.random() * 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad)
        }),
      ])
    ).start();
  }, [width, height]);
  
  // Animar as camadas de parallax
  const animateParallaxLayers = useCallback((
    backgroundLayer: Animated.Value,
    middleLayer: Animated.Value,
    foregroundLayer: Animated.Value
  ) => {
    // Movimento mais suave para camada de fundo
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundLayer, {
          toValue: 1,
          duration: 70000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(backgroundLayer, {
          toValue: 0,
          duration: 70000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
    
    // Movimento médio para camada do meio
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayer, {
          toValue: 1,
          duration: 50000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(middleLayer, {
          toValue: 0,
          duration: 50000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
    
    // Movimento mais rápido para camada da frente
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundLayer, {
          toValue: 1,
          duration: 30000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        }),
        Animated.timing(foregroundLayer, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin)
        })
      ])
    ).start();
  }, []);
  
  return {
    backgroundParticles,
    middleParticles,
    foregroundParticles,
    animateParticle,
    animateParallaxLayers
  };
}; 