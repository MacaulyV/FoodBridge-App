import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface MyRequestsTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
  subtitleOpacity?: Animated.Value;
  subtitleTranslateY?: Animated.Value;
}

/**
 * Componente de título da tela de Minhas Solicitações
 */
const MyRequestsTitle: React.FC<MyRequestsTitleProps> = ({
  titleOpacity,
  titleTranslateY,
  subtitleOpacity,
  subtitleTranslateY
}) => {
  // Usar valores padrão para subtítulo caso não sejam fornecidos
  const defaultSubtitleOpacity = subtitleOpacity || titleOpacity;
  const defaultSubtitleTranslateY = subtitleTranslateY || titleTranslateY;

  return (
    <View style={styles.container}>
      <Animated.Text 
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }
        ]}
      >
        Minhas Solicitações
      </Animated.Text>
      
      <Animated.Text 
        style={[
          styles.subtitle,
          {
            opacity: defaultSubtitleOpacity,
            transform: [{ translateY: defaultSubtitleTranslateY }]
          }
        ]}
      >
        Histórico de todas as doações que você solicitou.
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default MyRequestsTitle; 