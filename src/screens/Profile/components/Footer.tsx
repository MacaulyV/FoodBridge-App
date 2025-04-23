import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FooterProps } from '../types';

/**
 * Componente de rodapé da tela de perfil
 */
const Footer: React.FC<FooterProps> = ({
  footerOpacity,
  footerTranslateY
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: footerOpacity,
          transform: [{ translateY: footerTranslateY }]
        }
      ]}
    >
      <Text style={styles.text}>FoodBridge © 2025</Text>
      <Text style={styles.versionText}>Versão 1.0</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 5,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  }
});

export default Footer; 