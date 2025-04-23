import React from 'react';
import { ParticleSystemProps } from '../types';
import Particle from './Particle';

/**
 * Componente que gerencia e renderiza todas as partículas do sistema
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles
}) => {
  return (
    <>
      {/* Partículas em camadas - fundo */}
      {backgroundParticles.map((particle, index) => (
        <Particle
          key={`bg-${index}`}
          type={particle.type}
          style={{
            opacity: particle.opacity,
            transform: [
              { translateX: particle.translateX },
              { translateY: particle.translateY },
              { scale: particle.scale },
              { rotate: particle.rotate.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['0deg', '180deg', '360deg', '540deg']
              })}
            ]
          }}
        />
      ))}
      
      {/* Partículas em camadas - meio */}
      {middleParticles.map((particle, index) => (
        <Particle
          key={`mid-${index}`}
          type={particle.type}
          style={{
            opacity: particle.opacity,
            transform: [
              { translateX: particle.translateX },
              { translateY: particle.translateY },
              { scale: particle.scale },
              { rotate: particle.rotate.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['0deg', '180deg', '360deg', '540deg']
              })}
            ]
          }}
        />
      ))}
      
      {/* Partículas em camadas - frente */}
      {foregroundParticles.map((particle, index) => (
        <Particle
          key={`fg-${index}`}
          type={particle.type}
          style={{
            opacity: particle.opacity,
            transform: [
              { translateX: particle.translateX },
              { translateY: particle.translateY },
              { scale: particle.scale },
              { rotate: particle.rotate.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['0deg', '180deg', '360deg', '540deg']
              })}
            ]
          }}
        />
      ))}
    </>
  );
};

export default ParticleSystem; 