import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ProfileInfoProps } from '../types';
import Avatar from './Avatar';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente para exibir as informações do perfil do usuário
 */
const ProfileInfo: React.FC<ProfileInfoProps> = ({
  containerOpacity,
  containerTranslateY,
  userProfile,
}) => {
  // Função para formatar o tipo de perfil para exibição
  const getProfileTypeLabel = (type: string): string => {
    switch (type) {
      case 'pessoa_fisica':
        return 'Pessoa Física';
      case 'pessoa_juridica':
        return 'Pessoa Jurídica';
      case 'ong':
        return 'ONG';
      default:
        return 'Não informado';
    }
  };
  
  // Função para obter o ícone correspondente ao tipo de perfil
  const getProfileTypeIcon = (type: string) => {
    switch (type) {
      case 'pessoa_fisica':
        return 'person-outline';
      case 'pessoa_juridica':
        return 'business-outline';
      case 'ong':
        return 'people-outline';
      default:
        return 'help-circle-outline';
    }
  };
  
  const formatLocationText = (neighborhood: string, city: string) => {
    if (!neighborhood || !city) {
      return 'Não informado';
    }
    return `${city}, ${neighborhood}`;
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: containerOpacity,
          transform: [{ translateY: containerTranslateY }]
        }
      ]}
    >
      <View style={styles.avatarContainer}>
        <Avatar source={userProfile.avatar} />
      </View>
      
      <Text style={styles.nameText}>{userProfile.name}</Text>
      
      <View style={styles.profileTypeContainer}>
        <Ionicons 
          name={getProfileTypeIcon(userProfile.profileType)} 
          size={16} 
          color="#4CAF50" 
          style={styles.profileTypeIcon} 
        />
        <Text style={styles.profileTypeText}>
          {getProfileTypeLabel(userProfile.profileType)}
        </Text>
      </View>
      
      <View style={styles.locationInfo}>
        <Ionicons name="location" size={16} color="rgba(255, 255, 255, 0.7)" />
        <Text style={styles.locationText}>
          {formatLocationText(userProfile.neighborhood, userProfile.city)}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Email</Text>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={16} color="rgba(255, 255, 255, 0.6)" style={styles.infoIcon} />
          <Text style={styles.infoValue}>{userProfile.email}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileTypeIcon: {
    marginRight: 5,
  },
  profileTypeText: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ProfileInfo; 