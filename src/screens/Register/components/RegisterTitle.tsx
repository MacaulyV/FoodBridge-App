import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { RegisterTitleProps } from '../types';

const RegisterTitle: React.FC<RegisterTitleProps> = ({
  titleOpacity,
  titleTranslateY,
}) => {
  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }] 
        }
      ]}
    >
      <Text style={styles.title}>Cadastro</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default RegisterTitle; 