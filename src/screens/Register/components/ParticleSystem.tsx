import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ParticleSystemProps, ParticleData } from '../types';

// Componente para renderizar cada partícula individual
const Particle: React.FC<{ data: ParticleData }> = ({ data }) => {
  const particleSize = data.type === 'circle' ? 8 : data.type === 'star' ? 10 : 4;
  
  // Estilos específicos para cada tipo de partícula
  const particleStyle = {
    width: particleSize,
    height: particleSize,
    borderRadius: data.type === 'circle' ? particleSize / 2 : data.type === 'star' ? 0 : 2,
    backgroundColor: data.type === 'circle' 
      ? 'rgba(144, 238, 144, 0.7)' // Verde claro semi-transparente
      : data.type === 'star'
        ? 'rgba(255, 255, 255, 0.9)' // Branco quase opaco
        : 'rgba(144, 238, 144, 0.5)', // Verde mais transparente
    transform: [
      { translateX: data.translateX },
      { translateY: data.translateY },
      { scale: data.scale },
      { rotate: data.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }
    ],
    opacity: data.opacity,
  };
  
  return (
    <Animated.View 
      style={[styles.particle, particleStyle]} 
    />
  );
};

// Componente principal do sistema de partículas
const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  backgroundParticles, 
  middleParticles,
  foregroundParticles 
}) => {
  return (
    <View style={styles.container}>
      {/* Camada de fundo */}
      <View style={styles.particleLayer}>
        {backgroundParticles.map((particle, index) => (
          <Particle key={`bg-${index}`} data={particle} />
        ))}
      </View>
      
      {/* Camada do meio */}
      <View style={styles.particleLayer}>
        {middleParticles.map((particle, index) => (
          <Particle key={`mid-${index}`} data={particle} />
        ))}
      </View>
      
      {/* Camada da frente */}
      <View style={styles.particleLayer}>
        {foregroundParticles.map((particle, index) => (
          <Particle key={`fg-${index}`} data={particle} />
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
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
  },
});

export default ParticleSystem; 