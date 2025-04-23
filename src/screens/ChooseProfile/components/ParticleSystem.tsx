import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ParticleSystemProps, ParticleData } from '../types';

/**
 * Componente de sistema de partículas para o fundo
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles,
}) => {
  // Renderiza uma partícula individual com suas animações
  const renderParticle = (particle: ParticleData, index: number, zIndex: number): JSX.Element => {
    const { opacity, translateX, translateY, scale, rotate, type } = particle;
    
    // Agora todas as partículas usam o mesmo estilo simples
    return (
      <Animated.View
        key={`particle-${zIndex}-${index}`}
        style={[
          styles.particle,
          {
            zIndex,
            opacity,
            transform: [
              { translateX },
              { translateY },
              { scale },
              { rotate: rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                }) 
              }
            ]
          }
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Camada de fundo */}
      <View style={styles.particleLayer}>
        {backgroundParticles.map((particle, index) => 
          renderParticle(particle, index, 1)
        )}
      </View>
      
      {/* Camada do meio */}
      <View style={styles.particleLayer}>
        {middleParticles.map((particle, index) => 
          renderParticle(particle, index, 2)
        )}
      </View>
      
      {/* Camada da frente */}
      <View style={styles.particleLayer}>
        {foregroundParticles.map((particle, index) => 
          renderParticle(particle, index, 3)
        )}
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
  },
  particle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  }
});

export default ParticleSystem; 