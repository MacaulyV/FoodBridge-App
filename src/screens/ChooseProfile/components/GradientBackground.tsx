import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackgroundProps } from '../types';

/**
 * Componente de fundo com gradiente para tela de Escolha de Perfil
 * Seguindo o mesmo padrão visual do DonationsFeed
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  gradientOpacity,
  blurIntensity
}) => {
  return (
    <View style={styles.container}>
      {/* Gradiente principal */}
      <Animated.View style={[styles.gradientContainer, { opacity: gradientOpacity }]}>
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      {/* Gradiente de realce na parte superior */}
      <Animated.View style={[styles.accentGradientContainer, { opacity: gradientOpacity }]}>
        <LinearGradient
          colors={[
            'rgba(2, 22, 43, 0.15)', 
            'transparent'
          ]}
          style={styles.accentGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>
      
      {/* Overlay escuro adicional */}
      <View style={styles.darkOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: '#000000',
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
  },
  accentGradientContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  accentGradient: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
});

export default GradientBackground; 