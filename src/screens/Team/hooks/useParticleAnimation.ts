import { useRef } from 'react';
import { Animated, Dimensions, Easing, InteractionManager } from 'react-native';
import { ParticleData } from '../types';

// Easings personalizados para movimento mais natural
const floatingEasing = Easing.bezier(0.445, 0.05, 0.55, 0.95);
const gentleEasing = Easing.bezier(0.25, 0.46, 0.45, 0.94);

/**
 * Hook para gerenciar as animações do sistema de partículas com efeitos imersivos
 */
export const useParticleAnimation = () => {
  const { width, height } = Dimensions.get('window');
  
  // Cria um conjunto de partículas com posições e propriedades randômicas
  // Mais variedade nas partículas para efeito visual rico
  const createParticles = (count: number, zIndex: number): ParticleData[] => {
    return Array(count).fill(0).map(() => {
      const speedFactor = Math.random() * 0.6 + 0.4; // Ajustado para movimento mais suave
      const opacityFactor = Math.random() * 0.6 + 0.3; // Maior variação na opacidade para efeito de profundidade
      const delay = Math.random() * 3000; // Delay maior para criar sensação de assincronicidade
      const duration = Math.random() * 20000 + 15000; // Duração mais longa para movimentos mais suaves
      
      // Maior variedade de tipos de partículas
      const typeRandom = Math.random();
      const type = typeRandom > 0.75 
        ? 'circle' 
        : typeRandom > 0.5 
          ? 'star' 
          : typeRandom > 0.25
            ? 'dot'
            : 'pulse'; // Novo tipo de partícula
      
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
  
  // Criar conjuntos de partículas para diferentes camadas com maior densidade
  const backgroundParticles = useRef(createParticles(15, 1)).current; // Aumentado de 12 para 15
  const middleParticles = useRef(createParticles(12, 2)).current;     // Aumentado de 10 para 12
  const foregroundParticles = useRef(createParticles(10, 3)).current; // Aumentado de 8 para 10
  
  // Animar uma partícula individual com movimentos mais orgânicos e realistícos
  const animateParticle = (particle: ParticleData) => {
    const { opacity, translateX, translateY, scale, rotate, delay, duration, speedFactor, opacityFactor } = particle;
    const { width, height } = Dimensions.get('window');
    
    // Função auxiliar para criar valores aleatórios controlados
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    
    // Usar InteractionManager para priorizar interações do usuário
    InteractionManager.runAfterInteractions(() => {
      // Animar opacidade com loop e movimento mais orgânico
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: opacityFactor,
            duration: randomRange(1300, 1800),
            delay,
            useNativeDriver: true,
            easing: gentleEasing,
          }),
          Animated.timing(opacity, {
            toValue: opacityFactor * 0.4, // Maior variação para efeito mais dinâmico
            duration: randomRange(1300, 1800),
            useNativeDriver: true,
            easing: gentleEasing,
          }),
        ])
      ).start();
      
      // Animar posição Y com loop e efeito flutuante natural
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: randomRange(0, height),
            duration: duration * speedFactor,
            delay,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
          Animated.timing(translateY, {
            toValue: randomRange(0, height),
            duration: duration * speedFactor,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
        ])
      ).start();
      
      // Animar posição X com loop e movimento suave
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: randomRange(0, width),
            duration: duration * speedFactor * 1.2, // Diferente da velocidade Y para movimento não-linear
            delay,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
          Animated.timing(translateX, {
            toValue: randomRange(0, width),
            duration: duration * speedFactor * 1.2,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
        ])
      ).start();
      
      // Animar escala com loop para efeito de pulsação
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: randomRange(0.5, 1.2), // Maior variação para efeito mais dinâmico
            duration: duration * 0.4,
            delay,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
          Animated.timing(scale, {
            toValue: randomRange(0.3, 0.7),
            duration: duration * 0.4,
            useNativeDriver: true,
            easing: floatingEasing,
          }),
        ])
      ).start();
      
      // Animar rotação com loop para movimento orgânico
      Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: randomRange(15000, 25000), // Duração variável para parecer mais natural
          delay,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
    });
  };
  
  // Animar o efeito parallax nas diferentes camadas com maior profundidade
  const animateParallaxLayers = (
    backgroundParallax: Animated.Value,
    middleLayerParallax: Animated.Value,
    foregroundParallax: Animated.Value,
  ) => {
    // Parallax suave para o fundo com efeito mais lento
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundParallax, {
          toValue: 1,
          duration: 30000, // Mais lento para camada de fundo
          useNativeDriver: true,
          easing: floatingEasing,
        }),
        Animated.timing(backgroundParallax, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: true,
          easing: floatingEasing,
        }),
      ])
    ).start();
    
    // Parallax para a camada do meio com velocidade intermediária
    Animated.loop(
      Animated.sequence([
        Animated.timing(middleLayerParallax, {
          toValue: 1,
          duration: 22000, // Velocidade intermediária
          useNativeDriver: true,
          easing: floatingEasing,
        }),
        Animated.timing(middleLayerParallax, {
          toValue: 0,
          duration: 22000,
          useNativeDriver: true,
          easing: floatingEasing,
        }),
      ])
    ).start();
    
    // Parallax para a camada da frente com maior velocidade
    Animated.loop(
      Animated.sequence([
        Animated.timing(foregroundParallax, {
          toValue: 1,
          duration: 15000, // Mais rápido para camada frontal
          useNativeDriver: true,
          easing: floatingEasing,
        }),
        Animated.timing(foregroundParallax, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
          easing: floatingEasing,
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