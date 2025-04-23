import React from 'react';
import { Animated, StyleSheet, Image, View } from 'react-native';
import { IllustrationImageProps } from '../types';

/**
 * Componente para mostrar a imagem ilustrativa com animações aprimoradas
 * Integrado com o fundo gradiente sem bordas visíveis
 */
const IllustrationImage: React.FC<IllustrationImageProps> = ({
  imageOpacity,
  imageScale,
  imageTranslateY,
}) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: imageOpacity,
            transform: [
              { scale: imageScale },
              { translateY: imageTranslateY }
            ]
          }
        ]}
      >
        <Image
          source={require('../../../../assets/images/Girl-thinking.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    overflow: 'hidden',
    paddingBottom: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  image: {
    width: 300,
    height: 190,
    borderRadius: 8,
  },
});

export default IllustrationImage;