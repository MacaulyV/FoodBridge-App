import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

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

// Props para o componente
interface ParticleSystemProps {
  backgroundParticles: Particle[];
  middleParticles: Particle[];
  foregroundParticles: Particle[];
  backgroundParallax?: Animated.Value;
  middleLayerParallax?: Animated.Value;
  foregroundParallax?: Animated.Value;
}

/**
 * Componente que renderiza sistema de partículas em diferentes camadas
 * para criar efeito de profundidade
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles,
  backgroundParallax = new Animated.Value(0),
  middleLayerParallax = new Animated.Value(0),
  foregroundParallax = new Animated.Value(0),
}) => {
  // Renderizar uma partícula individual
  const renderParticle = (particle: Particle, parallaxValue: Animated.Value) => {
    return (
      <Animated.View
        key={`particle-${particle.id}`}
        style={[
          styles.particle,
          {
            width: particle.size,
            height: particle.size,
            borderRadius: particle.size / 2,
            opacity: particle.opacity,
            transform: [
              {
                translateX: Animated.add(
                  particle.x,
                  parallaxValue
                )
              },
              {
                translateY: particle.y
              }
            ],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Camada de fundo (partículas menores e mais lentas) */}
      <View style={styles.particleLayer}>
        {backgroundParticles.map((particle) =>
          renderParticle(particle, backgroundParallax)
        )}
      </View>

      {/* Camada do meio */}
      <View style={styles.particleLayer}>
        {middleParticles.map((particle) =>
          renderParticle(particle, middleLayerParallax)
        )}
      </View>

      {/* Camada da frente (partículas maiores e mais rápidas) */}
      <View style={styles.particleLayer}>
        {foregroundParticles.map((particle) =>
          renderParticle(particle, foregroundParallax)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    opacity: 0.2,
  },
});

export default ParticleSystem; 