import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ProfileHeaderProps } from '../types';

/**
 * Componente de cabeçalho da tela de perfil
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
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
      <Text style={styles.title}>Meu Perfil</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>Gerencie seus dados pessoais</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#12B05B',
    marginBottom: 15,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});

export default ProfileHeader; 