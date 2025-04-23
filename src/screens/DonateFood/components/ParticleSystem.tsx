import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ParticleSystemProps, ParticleData } from '../types';

// Componente de Partícula
const Particle: React.FC<{ particle: ParticleData }> = ({ particle }) => {
  // Definir o componente visual da partícula com base no tipo
  let particleStyle;
  
  // Calcular a rotação como uma string para animação
  const rotate = particle.rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  switch (particle.type) {
    case 'circle':
      particleStyle = [
        styles.baseParticle,
        styles.circleParticle,
        {
          opacity: particle.opacity,
          transform: [
            { translateX: particle.translateX },
            { translateY: particle.translateY },
            { scale: particle.scale },
            { rotate },
          ],
        },
      ];
      break;
      
    case 'star':
      particleStyle = [
        styles.baseParticle,
        styles.starParticle,
        {
          opacity: particle.opacity,
          transform: [
            { translateX: particle.translateX },
            { translateY: particle.translateY },
            { scale: particle.scale },
            { rotate },
          ],
        },
      ];
      break;
      
    case 'dot':
    default:
      particleStyle = [
        styles.baseParticle,
        styles.dotParticle,
        {
          opacity: particle.opacity,
          transform: [
            { translateX: particle.translateX },
            { translateY: particle.translateY },
            { scale: particle.scale },
            { rotate },
          ],
        },
      ];
      break;
  }
  
  return <Animated.View style={particleStyle} />;
};

// Componente Sistema de Partículas
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles,
}) => {
  return (
    <View style={styles.container}>
      {/* Camada de fundo */}
      <View style={styles.layer}>
        {backgroundParticles.map((particle, index) => (
          <Particle key={`bg-${index}`} particle={particle} />
        ))}
      </View>
      
      {/* Camada do meio */}
      <View style={styles.layer}>
        {middleParticles.map((particle, index) => (
          <Particle key={`mid-${index}`} particle={particle} />
        ))}
      </View>
      
      {/* Camada da frente */}
      <View style={styles.layer}>
        {foregroundParticles.map((particle, index) => (
          <Particle key={`fg-${index}`} particle={particle} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
  baseParticle: {
    position: 'absolute',
  },
  circleParticle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  starParticle: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 1,
  },
  dotParticle: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default ParticleSystem; 