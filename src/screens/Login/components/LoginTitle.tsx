import React from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { LoginTitleProps } from '../types';

const LoginTitle: React.FC<LoginTitleProps> = ({
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
      <Text style={styles.title}>Entrar</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default LoginTitle; 