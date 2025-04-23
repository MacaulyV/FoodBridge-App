import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileActionsProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Componente que exibe as ações disponíveis para o perfil
 * Com o gradiente padronizado em todas as telas
 */
const ProfileActions: React.FC<ProfileActionsProps> = ({
  actionsOpacity,
  actionsTranslateY,
  onEdit,
  onDelete,
}) => {
  // Animações para botões
  const editButtonScale = useRef(new Animated.Value(1)).current;
  const deleteButtonScale = useRef(new Animated.Value(1)).current;
  
  // Animar botão quando pressionado
  const animateButtonPress = (scale: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: actionsOpacity,
          transform: [{ translateY: actionsTranslateY }]
        }
      ]}
    >
      <LinearGradient
        colors={['#070F1B', '#0D1723', '#182B3A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        {/* Botão Editar */}
        <Animated.View style={{ transform: [{ scale: editButtonScale }], alignSelf: 'center', width: '70%' }}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            activeOpacity={0.8}
            onPress={() => animateButtonPress(editButtonScale, onEdit)}
          >
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Editar Informações</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Botão Excluir */}
        <Animated.View style={{ transform: [{ scale: deleteButtonScale }], alignSelf: 'center', width: '70%' }}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.8}
            onPress={() => animateButtonPress(deleteButtonScale, onDelete)}
          >
            <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gradientContainer: {
    padding: 20,
  },
  actionButton: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 5,
    width: '100%',
  },
  editButton: {
    backgroundColor: 'rgb(50, 221, 150)',
  },
  deleteButton: {
    backgroundColor: 'rgb(255, 45, 85)',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProfileActions;