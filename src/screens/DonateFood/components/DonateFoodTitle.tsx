import React from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { DonateFoodTitleProps } from '../types';

/**
 * Componente de título para a tela de Doação de Alimentos
 */
const DonateFoodTitle: React.FC<DonateFoodTitleProps> = ({
  titleOpacity,
  titleTranslateY,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        },
      ]}
    >
      <Text style={styles.title}>Nova Doação</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});

export default DonateFoodTitle;