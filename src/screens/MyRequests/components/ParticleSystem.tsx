import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export interface Particle {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  rotateZ: Animated.Value;
  color: string;
}

interface ParticleSystemProps {
  backgroundParticles: Particle[];
  middleParticles: Particle[];
  foregroundParticles: Particle[];
}

/**
 * Componente que renderiza o sistema de partículas flutuantes
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles
}) => {
  // Função para renderizar uma partícula
  const renderParticle = (particle: Particle, zIndex: number) => {
    return (
      <Animated.View
        key={particle.id}
        style={[
          styles.particle,
          {
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: [
              { translateX: particle.x },
              { translateY: particle.y },
              { scale: particle.scale },
              { rotateZ: particle.rotateZ.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              }) }
            ],
            zIndex
          }
        ]}
      />
    );
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Partículas de fundo (mais afastadas) */}
      {backgroundParticles.map(particle => renderParticle(particle, 1))}
      
      {/* Partículas da camada do meio */}
      {middleParticles.map(particle => renderParticle(particle, 2))}
      
      {/* Partículas da camada frontal (mais próximas) */}
      {foregroundParticles.map(particle => renderParticle(particle, 3))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

export default ParticleSystem; 