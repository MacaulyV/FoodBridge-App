import React from 'react';
import { StyleSheet, Animated, Text } from 'react-native';
import { WelcomeTitleProps } from '../types';

const WelcomeTitle: React.FC<WelcomeTitleProps> = ({
  titleOpacity,
  titleTranslateY,
  subtitleOpacity,
  subtitleTranslateY
}) => {
  return (
    <Animated.View style={styles.textSection}>
      <Animated.Text 
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }
        ]}
      >
        Olá! Conheça a{"\n"}
        <Text style={styles.foodText}>Food</Text><Text style={styles.bridgeText}>Bridge</Text>
      </Animated.Text>
      <Animated.Text 
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
            transform: [{ translateY: subtitleTranslateY }]
          }
        ]}
        numberOfLines={2}
      >
        Um jeito simples e direto de compartilhar ou receber alimentos.
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  textSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    marginTop: 10,
    marginBottom: 0,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    lineHeight: 36,
  },
  foodText: {
    color: '#FF9800',
    fontSize: 32,
  },
  bridgeText: {
    color: '#12B05B',
    fontSize: 32,
  },
  subtitle: {
    fontSize: 17,
    color: '#FF9800',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    lineHeight: 26,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default WelcomeTitle; 