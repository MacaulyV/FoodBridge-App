import { useRef } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { ParticleData } from '../types';
import { customEasings } from '../../../utils/animations';

/**
 * Hook para criar e animar o sistema de partículas
 */
export const useParticleAnimation = () => {
  // Dimensões da tela
  const { width, height } = Dimensions.get('window');
  
  // Cria diferentes tipos de partículas para maior variedade visual
  const createParticles = (count: number, type: 'background' | 'foreground' | 'middle'): ParticleData[] => {
    const speedFactor = type === 'background' ? 0.7 : type === 'middle' ? 1 : 1.3;
    const sizeFactor = type === 'background' ? 0.8 : type === 'middle' ? 1 : 1.2;
    const opacityFactor = type === 'background' ? 0.5 : type === 'middle' ? 0.7 : 1;
    
    return Array(count).fill(0).map(() => {
      const particleType: 'circle' | 'star' | 'dot' = 
        Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'star' : 'dot';
        
      return {
        opacity: useRef(new Animated.Value(0)).current,
        translateX: useRef(new Animated.Value(Math.random() * width - width/2)).current,
        translateY: useRef(new Animated.Value(Math.random() * height - height/2)).current,
        scale: useRef(new Animated.Value((Math.random() * 0.5 + 0.5) * sizeFactor)).current,
        rotate: useRef(new Animated.Value(0)).current,
        type: particleType,
        speedFactor,
        opacityFactor,
        delay: Math.random() * 1000,
        duration: 3000 + Math.random() * 3000,
      };
    });
  };
  
  // Criando três camadas de partículas para efeito de profundidade
  const backgroundParticles = createParticles(15, 'background');
  const middleParticles = createParticles(20, 'middle');
  const foregroundParticles = createParticles(12, 'foreground');

  // Função para animar uma partícula com efeito mais natural
  const animateParticle = (particle: ParticleData, index: number) => {
    const baseDelay = particle.delay;
    const duration = particle.duration;
    
    // Nova sequência de animação para cada partícula - com loop infinito
    Animated.loop(
      Animated.sequence([
        // Fade in com timing variado
        Animated.timing(particle.opacity, {
          toValue: Math.random() * 0.5 + 0.3 * particle.opacityFactor,
          duration: 800 + Math.random() * 400,
          delay: baseDelay,
          easing: customEasings.softInOut,
          useNativeDriver: true
        }),
        // Mantém visível por mais tempo
        Animated.timing(particle.opacity, {
          toValue: Math.random() * 0.5 + 0.3 * particle.opacityFactor,
          duration: duration * 0.6,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        // Fade out suave - mas não completamente
        Animated.timing(particle.opacity, {
          toValue: 0.1, // Manter ligeiramente visível em vez de desaparecer completamente
          duration: duration * 0.4,
          easing: customEasings.decelerate,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Loop infinito para movimento X com efeito parallax
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.translateX, {
          toValue: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 200 + 50) * particle.speedFactor,
          duration: duration,
          delay: baseDelay,
          easing: customEasings.cinematic,
          useNativeDriver: true
        }),
        Animated.timing(particle.translateX, {
          toValue: (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 200 + 50) * particle.speedFactor,
          duration: duration,
          easing: customEasings.cinematic,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Loop infinito para movimento Y com efeito de gravidade suave
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.translateY, {
          toValue: (Math.random() > 0.3 ? -1 : 1) * (Math.random() * 200 + 50) * particle.speedFactor,
          duration: duration,
          delay: baseDelay,
          easing: index % 3 === 0 ? customEasings.gentleBounce : customEasings.softInOut,
          useNativeDriver: true
        }),
        Animated.timing(particle.translateY, {
          toValue: (Math.random() > 0.3 ? 1 : -1) * (Math.random() * 200 + 50) * particle.speedFactor,
          duration: duration,
          easing: index % 3 === 0 ? customEasings.gentleBounce : customEasings.softInOut,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Rotação contínua em loop para todas as partículas
    Animated.loop(
      Animated.timing(particle.rotate, {
        toValue: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 1),
        duration: duration * 1.5,
        delay: baseDelay,
        easing: customEasings.softInOut,
        useNativeDriver: true
      })
    ).start();
    
    // Escala pulsante sutil para todas as partículas em loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(particle.scale, {
          toValue: (particle.scale as any)._value * 1.2,
          duration: 2000 + Math.random() * 1000,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(particle.scale, {
          toValue: (particle.scale as any)._value,
          duration: 2000 + Math.random() * 1000,
          easing: Easing.in(Easing.sin),
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Efeito parallax para as camadas
  const animateParallaxLayers = (
    backgroundParallax: Animated.Value,
    middleLayerParallax: Animated.Value,
    foregroundParallax: Animated.Value
  ) => {
    // Movimento sutil para a camada de fundo
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundParallax, {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(backgroundParallax, {
          toValue: 0,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Movimento para a camada intermediária
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayerParallax, {
          toValue: 1,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(middleLayerParallax, {
          toValue: 0,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
    
    // Movimento mais rápido para o primeiro plano
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundParallax, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(foregroundParallax, {
          toValue: 0,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Função para definir os valores finais das partículas sem animação
  const setFinalParticleValues = () => {
    // Definir valores finais das partículas
    [...backgroundParticles, ...middleParticles, ...foregroundParticles].forEach(particle => {
      // Definir opacidade entre 0.3 e 0.8 dependendo do tipo da partícula
      particle.opacity.setValue(particle.opacityFactor * (Math.random() * 0.5 + 0.3));
      
      // Definir posições aleatórias dentro da tela
      particle.translateX.setValue((Math.random() * 2 - 1) * 100 * particle.speedFactor);
      particle.translateY.setValue((Math.random() * 2 - 1) * 100 * particle.speedFactor);
      
      // Definir escala final
      particle.scale.setValue((Math.random() * 0.5 + 0.5) * particle.speedFactor);
      
      // Definir rotação aleatória
      particle.rotate.setValue(Math.random() * 2 - 1);
    });
  };

  // Retorna as partículas e as funções de animação
  return {
    backgroundParticles,
    middleParticles,
    foregroundParticles,
    animateParticle,
    animateParallaxLayers,
    setFinalParticleValues
  };
}; 