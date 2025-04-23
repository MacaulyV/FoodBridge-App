import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { ParticleSystemProps, ParticleData } from '../types';

/**
 * Sistema de partículas imersivo para criar um fundo dinâmico animado
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  backgroundParticles,
  middleParticles,
  foregroundParticles,
}) => {
  // Obter dimensões da tela
  const { width, height } = Dimensions.get('window');
  
  // Renderizar uma partícula com estilo e animação
  const renderParticle = (particle: ParticleData, index: number, zIndex: number) => {
    const { opacity, translateX, translateY, scale, rotate, type } = particle;
    
    // Converter o valor de rotação para uma string CSS de rotação
    const rotateStr = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    
    // Estilo dinâmico baseado no tipo de partícula
    let particleStyle = {};
    let size = 10;
    
    switch (type) {
      case 'circle':
        size = Math.random() * 10 + 5;
        particleStyle = {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        };
        break;
        
      case 'star':
        size = Math.random() * 15 + 10;
        particleStyle = {
          width: size,
          height: size,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: size / 2,
          borderRightWidth: size / 2,
          borderBottomWidth: size,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: `rgba(255, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100)}, 0.8)`,
          transform: [{ rotate: '180deg' }],
        };
        break;
        
      case 'dot':
        size = Math.random() * 3 + 1;
        particleStyle = {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: `rgba(${Math.floor(Math.random() * 155) + 100}, ${Math.floor(Math.random() * 155) + 100}, 255, 0.8)`,
        };
        break;
        
      case 'pulse':
        size = Math.random() * 12 + 8;
        particleStyle = {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: `rgba(18, 176, 91, ${Math.random() * 0.5 + 0.3})`,
        };
        break;
        
      default:
        size = Math.random() * 6 + 2;
        particleStyle = {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        };
    }
    
    // Adicionar blur para algumas partículas para maior profundidade visual
    if (Math.random() > 0.7) {
      particleStyle = {
        ...particleStyle,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
      };
    }
    
    return (
      <Animated.View
        key={`particle-${type}-${index}-${zIndex}`}
        style={[
          styles.particle,
          particleStyle,
          {
            opacity,
            zIndex,
            transform: [
              { translateX },
              { translateY },
              { scale },
              { rotate: rotateStr },
            ],
          },
        ]}
      />
    );
  };
  
  // Aplicar efeito parallax nas camadas
  const applyParallaxEffect = (particles: ParticleData[], zIndex: number) => {
    return particles.map((particle, index) => renderParticle(particle, index, zIndex));
  };
  
  return (
    <View style={styles.container}>
      {/* Camada de fundo (mais longe) */}
      <View style={[styles.layer, styles.backgroundLayer]}>
        {applyParallaxEffect(backgroundParticles, 1)}
      </View>
      
      {/* Camada do meio */}
      <View style={[styles.layer, styles.middleLayer]}>
        {applyParallaxEffect(middleParticles, 2)}
      </View>
      
      {/* Camada da frente (mais próxima) */}
      <View style={[styles.layer, styles.foregroundLayer]}>
        {applyParallaxEffect(foregroundParticles, 3)}
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
    overflow: 'hidden',
  },
  backgroundLayer: {
    zIndex: 1,
  },
  middleLayer: {
    zIndex: 2,
  },
  foregroundLayer: {
    zIndex: 3,
  },
  particle: {
    position: 'absolute',
  },
});

export default ParticleSystem; 