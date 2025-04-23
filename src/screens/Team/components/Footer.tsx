import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { FooterProps } from '../types';

/**
 * Componente de rodapé para a tela Team
 */
const Footer: React.FC<FooterProps> = ({
  footerOpacity,
  footerTranslateY,
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
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/icons/Logo-Vazio.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.versionText}>Versão 1.0 – 2025</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    opacity: 0.8,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Footer; 