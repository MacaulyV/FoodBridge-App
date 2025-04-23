import React from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { AvatarProps } from '../types';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente de avatar para exibição de foto do usuário
 */
const Avatar: React.FC<AvatarProps> = ({ 
  source, 
  size = 120,
  opacity = new Animated.Value(1),
  scale = new Animated.Value(1),
  onPress,
  editable = false,
}) => {
  // Definir avatar padrão se nenhum for fornecido
  const avatarSource = source 
    ? { uri: source } 
    : require('../../../../assets/icons/Logo-Vazio.png');
  
  // Tamanho do ícone de edição proporcional ao tamanho do avatar
  const editIconSize = Math.max(22, size * 0.18);
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          transform: [{ scale }]
        }
      ]}
    >
      {source ? (
        <Image 
          source={avatarSource} 
          style={styles.image} 
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="person" size={size * 0.4} color="rgba(255, 255, 255, 0.8)" />
        </View>
      )}
      
      {editable && (
        <View style={[
          styles.editIconContainer,
          {
            width: editIconSize,
            height: editIconSize,
            borderRadius: editIconSize / 2
          }
        ]}>
          <Ionicons name="camera" size={editIconSize * 0.6} color="#FFFFFF" />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(30, 30, 30, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(18, 176, 91, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default Avatar; 