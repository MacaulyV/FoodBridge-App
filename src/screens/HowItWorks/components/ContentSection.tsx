import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ContentSectionProps } from '../types';

/**
 * Componente para exibir o título e a descrição com animações
 */
const ContentSection: React.FC<ContentSectionProps> = ({
  titleOpacity,
  titleTranslateY,
  descriptionOpacity,
  descriptionTranslateY,
}) => {
  return (
    <View style={styles.container}>
      {/* Título animado */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }
        ]}
      >
        <Text style={styles.title}>
          {"Doe ou receba alimentos "}
          <Text style={styles.titleHighlight}>{"de forma solidária"}</Text>
        </Text>
      </Animated.View>

      {/* Descrição animada */}
      <Animated.View
        style={[
          styles.descriptionContainer,
          {
            opacity: descriptionOpacity,
            transform: [{ translateY: descriptionTranslateY }]
          }
        ]}
      >
        <Text style={styles.description}>
          Conectamos quem quer ajudar com quem precisa — sem burocracia, 
          de pessoa para pessoa ou para ONGs.
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7F50',
    textAlign: 'center',
    lineHeight: 32,
  },
  titleHighlight: {
    color: '#4CAF50', // #12B05B
  },
  descriptionContainer: {
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ContentSection; 