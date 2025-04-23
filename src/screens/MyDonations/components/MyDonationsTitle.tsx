import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MyDonationsTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

/**
 * Componente que renderiza o título animado da tela de Minhas Doações
 */
const MyDonationsTitle: React.FC<MyDonationsTitleProps> = ({
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
        <Ionicons name="gift-outline" size={28} color="#4CAF50" />
      </View>
      <Text style={styles.title}>Minhas Doações</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default MyDonationsTitle; 