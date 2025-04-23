import React from 'react';
import { Animated, StyleSheet } from 'react-native';

// Tipos para as propriedades do componente
export interface ParticleProps {
  style: object;
  type?: 'circle' | 'star' | 'dot';
}

/**
 * Componente para criar as partículas flutuantes com diferentes formatos
 */
const Particle: React.FC<ParticleProps> = ({ style, type = 'circle' }) => {
  // Diferentes estilos de partículas para criar mais variedade visual
  const particleStyles = {
    circle: styles.particleCircle,
    star: styles.particleStar,
    dot: styles.particleDot,
  };

  return (
    <Animated.View style={[particleStyles[type], style]} />
  );
};

// Estilos para os diferentes tipos de partículas
const styles = StyleSheet.create({
  particleCircle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#FF9800',
    borderRadius: 5,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  particleStar: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#FF9800',
    borderRadius: 4,
    shadowColor: '#FFCC80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  particleDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FF9800',
    borderRadius: 2,
    shadowColor: '#FFCC80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
});

export default Particle; 