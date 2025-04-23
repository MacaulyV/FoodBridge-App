import React from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

interface FlashEffectProps {
  flashOpacity: Animated.Value;
}

const { width, height } = Dimensions.get('window');

const FlashEffect: React.FC<FlashEffectProps> = ({ flashOpacity }) => {
  return (
    <Animated.View
      style={[
        styles.flashContainer,
        {
          opacity: flashOpacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  flashContainer: {
    position: 'absolute',
    width: width * 2,
    height: height * 2,
    backgroundColor: '#FFFFFF',
    top: -height / 2,
    left: -width / 2,
    zIndex: 1000,
    pointerEvents: 'none',
  },
});

export default FlashEffect; 