import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ContentSectionProps } from '../types';

/**
 * Componente para exibir o título principal com animações
 * Layout e cores ajustados para dar mais destaque e estilo
 */
const ContentSection: React.FC<ContentSectionProps> = ({
  titleOpacity,
  titleTranslateY,
}) => {
  return (
    <View style={styles.container}>
      {/* Título animado com duas linhas e cores diferentes */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }
        ]}
      >
        <Text style={styles.titleLine}>
          <Text style={styles.titlePart1}>Como você quer</Text>
        </Text>
        <Text style={styles.titleLine}>
          <Text style={styles.titlePart2}>Começar?</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10, // Reduzido para aproximar as opções do título
    alignItems: 'center',
    marginTop: 20, // Reduzido também a margem superior
  },
  titleContainer: {
    width: '85%', // Reduz a largura para forçar a quebra de linha
    alignItems: 'center',
  },
  titleLine: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40, // Aumenta o espaçamento entre linhas
  },
  titlePart1: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  titlePart2: {
    color: '#FF9800', // Cor laranja para "Começar?"
    fontSize: 32, // Tamanho maior para dar destaque
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 152, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default ContentSection; 