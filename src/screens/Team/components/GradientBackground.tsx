import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackgroundProps } from '../types';

/**
 * Componente que renderiza um fundo gradiente animado para a tela Team
 * usando o mesmo gradiente padronizado em todas as telas
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  gradientOpacity,
  blurIntensity 
}) => {
  // Assegurar que os valores de animação são válidos
  const safeOpacity = gradientOpacity || new Animated.Value(1);
  
  return (
    <Animated.View style={[styles.container, { opacity: safeOpacity }]}>
      {/* Camada de base escura */}
      <View style={styles.baseLayer} />
      
      {/* Gradiente principal - mesmo padrão das outras telas */}
      <Animated.View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      
      {/* Camada de overlay sutil */}
      <View style={styles.overlayLayer} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  baseLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  overlayLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});

export default GradientBackground; 