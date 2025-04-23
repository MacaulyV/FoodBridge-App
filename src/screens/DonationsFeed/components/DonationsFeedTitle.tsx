import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface DonationsFeedTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

/**
 * Título da tela Doações Disponíveis
 */
const DonationsFeedTitle: React.FC<DonationsFeedTitleProps> = ({
  titleOpacity,
  titleTranslateY
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
      <View style={styles.iconContainer}>
        <FontAwesome5 name="hand-holding-heart" size={32} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>Doações Disponíveis</Text>
      <Text style={styles.subtitle}>Alimentos disponíveis para Solicitar</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 255, 242, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(46, 182, 125, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default DonationsFeedTitle; 