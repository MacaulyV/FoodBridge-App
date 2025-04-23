import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Animated,
  Dimensions 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { DonationCardProps } from '../types';

// Dimensões da tela
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 24; // 2 colunas com margens

/**
 * Componente que renderiza um card de doação na grade
 */
const DonationCard: React.FC<DonationCardProps> = ({
  donation,
  onViewDetails,
  cardOpacity,
  cardScale
}) => {
  // Formatar a data de validade
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
  
  // Obter a URL da imagem ou usar um placeholder
  const imageUrl = donation.imagens_urls && donation.imagens_urls.length > 0
    ? donation.imagens_urls[0]
    : 'https://via.placeholder.com/150?text=Sem+Imagem';
    
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
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => onViewDetails(donation)}
      >
        <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
          {/* Imagem do alimento */}
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
            
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.imageGradient}
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
            
            {/* Botão visualizar */}
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => onViewDetails(donation)}
            >
              <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
              <Text style={styles.viewButtonText}>Visualizar</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: 6,
    marginBottom: 16,
    marginLeft: 3,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 40, 60, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    height: 220,
    marginRight: 0,
  },
  blurContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 110,
    width: '100%',
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
  imageGradient: {
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
    padding: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 6,
    flex: 1,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiryLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 6,
  },
  expiryValue: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(46, 182, 125)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  viewButtonText: {
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default DonationCard; 