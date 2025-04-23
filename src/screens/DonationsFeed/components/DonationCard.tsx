import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Animated,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { DonationCardProps } from '../types';

// Dimensões da tela
const { width } = Dimensions.get('window');

// Largura do card (metade da tela menos margens)
const CARD_WIDTH = (width / 2) - 25;

/**
 * Componente de Card de Doação
 */
const DonationCard: React.FC<DonationCardProps> = ({
  donation,
  onViewDetails,
  cardOpacity,
  cardScale
}) => {
  // Verificar se há imagens disponíveis
  const hasImage = donation.imagens_urls && donation.imagens_urls.length > 0;
  
  // Imagem padrão caso não haja imagens
  const imageUrl = hasImage
    ? donation.imagens_urls![0]
    : 'https://via.placeholder.com/200?text=Sem+Imagem';
    
  // Formatar data de validade
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };
  
  // Verificar se a doação vence hoje ou amanhã ou está vencida
  const checkExpirationStatus = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const expiryDate = new Date(donation.VALIDADE);
    expiryDate.setHours(0, 0, 0, 0);
    
    // Verificar se a data de validade já passou (produto vencido)
    if (expiryDate.getTime() < today.getTime()) {
      return 'vencido';
    }
    // Verificar se a data de validade é hoje ou amanhã
    else if (expiryDate.getTime() === today.getTime()) {
      return 'hoje';
    } else if (expiryDate.getTime() === tomorrow.getTime()) {
      return 'amanhã';
    }
    
    return null;
  };
  
  const expirationStatus = checkExpirationStatus();
  
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: cardOpacity,
          transform: [{ scale: cardScale }]
        }
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => onViewDetails(donation)}
        activeOpacity={0.9}
      >
        {/* Imagem de fundo */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
          
          {/* Tag de alerta para doações que vencem hoje, amanhã ou estão vencidas */}
          {expirationStatus && (
            <View style={[
              styles.expirationTag, 
              expirationStatus === 'hoje' ? styles.expirationTagUrgent : 
              expirationStatus === 'amanhã' ? styles.expirationTagWarning : 
              styles.expirationTagExpired
            ]}>
              {expirationStatus === 'hoje' ? (
                <MaterialIcons name="alarm-on" size={12} color="#FFFFFF" style={styles.expirationIcon} />
              ) : expirationStatus === 'amanhã' ? (
                <MaterialIcons name="access-time" size={12} color="#FFFFFF" style={styles.expirationIcon} />
              ) : (
                <MaterialIcons name="error-outline" size={12} color="#FFFFFF" style={styles.expirationIcon} />
              )}
              <Text style={styles.expirationTagText}>
                {expirationStatus === 'vencido' ? 'Vencido' : `Vence ${expirationStatus}`}
              </Text>
            </View>
          )}
          
          {/* Gradiente sobre a imagem */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          
          {/* Nome do alimento sobre a imagem */}
          <View style={styles.imageTitleContainer}>
            <FontAwesome5 name="utensils" size={12} color="#FFFFFF" />
            <Text style={styles.imageTitle} numberOfLines={1}>
              {donation.NOME_ALIMENTO}
            </Text>
          </View>
        </View>
        
        {/* Informações da doação */}
        <View style={styles.infoContainer}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#CCCCCC" />
            <Text style={styles.locationText} numberOfLines={1}>
              {donation.BAIRRO_OU_DISTRITO}
            </Text>
          </View>
          
          <View style={styles.expiryContainer}>
            <MaterialIcons name="event" size={14} color="#CCCCCC" />
            <Text style={styles.expiryLabel}>Validade:</Text>
            <Text style={styles.expiryValue}>
              {formatDate(donation.VALIDADE)}
            </Text>
          </View>
        </View>
        
        {/* Botão de Solicitar */}
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={() => onViewDetails(donation)}
          activeOpacity={0.7}
        >
          <MaterialIcons name="assignment-turned-in" size={14} color="#FFFFFF" />
          <Text style={styles.requestButtonText}>Solicitar</Text>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: 'rgba(10, 17, 30, 0.8)', // Background mais escuro
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 110,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  expirationTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirationIcon: {
    marginRight: 4,
  },
  expirationTagUrgent: {
    backgroundColor: '#FF3B30', // Vermelho para items que vencem hoje (mais urgente)
  },
  expirationTagWarning: {
    backgroundColor: '#FF5500', // Laranja para items que vencem amanhã
  },
  expirationTagExpired: {
    backgroundColor: '#8B0000', // Vermelho escuro para itens vencidos
  },
  expirationTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  imageTitleContainer: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 6,
    flex: 1,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 6,
    flex: 1,
  },
  expiryContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryLabel: {
    fontSize: 11,
    color: '#CCCCCC',
    marginRight: 4,
    marginLeft: 6,
  },
  expiryValue: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  requestButton: {
    backgroundColor: '#4783C0', // Azul
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 4,
  },
});

export default DonationCard; 