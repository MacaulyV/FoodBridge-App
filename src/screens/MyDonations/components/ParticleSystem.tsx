import React from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

// Dimensões da tela
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

interface ParticleSystemProps {
  backgroundParticles: Particle[];
  middleParticles: Particle[];
  foregroundParticles: Particle[];
}

/**
 * Componente que renderiza o sistema de partículas animadas em diferentes camadas
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles
}) => {
  // Renderiza uma partícula individual
  const renderParticle = (particle: Particle) => {
    const particleStyle = {
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      borderRadius: particle.size / 2,
      backgroundColor: `rgba(255, 255, 255, ${particle.alpha})`,
      transform: [
        { scale: particle.scale },
        { translateX: particle.translate.x },
        { translateY: particle.translate.y },
        { rotate: particle.rotate.interpolate({
            inputRange: [0, 1, 2, 3, 4],
            outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
          })
        },
      ],
    };
    
    return (
      <Animated.View
        key={particle.id}
        style={[styles.particle, particleStyle]}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Camada de fundo (partículas pequenas, movimento lento) */}
      <View style={styles.particleLayer}>
        {backgroundParticles.map(renderParticle)}
      </View>
      
      {/* Camada do meio (partículas médias, movimento médio) */}
      <View style={styles.particleLayer}>
        {middleParticles.map(renderParticle)}
      </View>
      
      {/* Camada de frente (partículas grandes, movimento rápido) */}
      <View style={styles.particleLayer}>
        {foregroundParticles.map(renderParticle)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    zIndex: 0,
  },
  particleLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default ParticleSystem; 