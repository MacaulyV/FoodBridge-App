import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { IllustrationImageProps } from '../types';

/**
 * Componente para exibir a imagem ilustrativa animada
 */
const IllustrationImage: React.FC<IllustrationImageProps> = ({
  imageOpacity,
  imageScale,
  imageTranslateY,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: imageOpacity,
          transform: [
            { scale: imageScale },
            { translateY: imageTranslateY } // Usando a propriedade recebida para mover verticalmente
          ]
        }
      ]}
    >
      <Animated.Image
        source={require('../../../../assets/images/Food-Donation.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    borderRadius: 50,
    width: 450,
    height: 300,
  },
});

export default IllustrationImage; 