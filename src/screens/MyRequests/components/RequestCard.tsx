import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RequestCardProps } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;
const imageHeight = 160;

/**
 * Componente de Card que exibe uma solicitação de doação
 */
const RequestCard: React.FC<RequestCardProps> = ({
  request,
  onViewDetails,
  cardOpacity,
  cardScale
}) => {
  // Estado para animação de toque
  const pressAnim = React.useRef(new Animated.Value(1)).current;
  
  // Função para animar o toque
  const animatePress = (pressed: boolean) => {
    Animated.spring(pressAnim, {
      toValue: pressed ? 0.97 : 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Formatar a data de solicitação
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para verificar status de vencimento da doação
  const checkExpirationStatus = () => {
    if (!request.donation?.VALIDADE) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const expiryDate = new Date(request.donation.VALIDADE);
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

  // Função para renderizar a tag de status da solicitação
  const renderStatusTag = () => {
    switch (request.STATUS) {
      case 'AGUARDANDO':
        return (
          <View style={[styles.statusTagContainer, styles.waitingTag]}>
            <Ionicons name="time-outline" size={12} color="#000" />
            <Text style={[styles.statusText, styles.waitingText]}>Aguardando</Text>
          </View>
        );
      case 'ACEITA':
        return (
          <View style={[styles.statusTagContainer, styles.acceptedTag]}>
            <Ionicons name="checkmark-circle-outline" size={12} color="#fff" />
            <Text style={[styles.statusText, styles.acceptedText]}>Aceita</Text>
          </View>
        );
      case 'RECUSADA':
        return (
          <View style={[styles.statusTagContainer, styles.rejectedTag]}>
            <Ionicons name="close-circle-outline" size={12} color="#fff" />
            <Text style={[styles.statusText, styles.rejectedText]}>Recusada</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: cardOpacity,
          transform: [
            { scale: Animated.multiply(cardScale, pressAnim) }
          ]
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => onViewDetails(request)}
        onPressIn={() => animatePress(true)}
        onPressOut={() => animatePress(false)}
        style={styles.card}
      >
        <LinearGradient
          colors={['rgba(18, 176, 91, 0.15)', 'rgba(25, 33, 80, 0.2)']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Tag de status */}
        {renderStatusTag()}

        {/* Imagem da doação */}
        <View style={styles.imageContainer}>
          {/* Alerta de vencimento (no canto superior esquerdo) */}
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
          
          {request.donation?.imagens_urls && request.donation.imagens_urls.length > 0 ? (
            <Image
              source={{ uri: request.donation.imagens_urls[0] }}
              style={styles.donationImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="fast-food-outline" size={40} color="rgba(255, 255, 255, 0.5)" />
            </View>
          )}
          
          {/* Gradiente sobre a imagem */}
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          
          {/* Nome do alimento sobre a imagem */}
          <View style={styles.imageTitleContainer}>
            <FontAwesome5 name="utensils" size={14} color="#FFFFFF" />
            <Text style={styles.imageTitle} numberOfLines={1}>
              {request.donation?.NOME_ALIMENTO || 'Doação não disponível'}
            </Text>
          </View>
        </View>

        {/* Informações da doação */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={16} color="#4783C0" />
            </View>
            <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
              {request.donation?.BAIRRO_OU_DISTRITO || 'Localização não disponível'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="event" size={16} color="#4783C0" />
            </View>
            <Text style={styles.infoText}>
              Validade: {request.donation?.VALIDADE 
                ? new Date(request.donation.VALIDADE).toLocaleDateString('pt-BR')
                : 'Não informada'
              }
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="history" size={16} color="#4783C0" />
            </View>
            <Text style={styles.infoText}>
              Solicitado em: {formatDate(request.DATA_SOLICITACAO)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    borderRadius: 20,
    backgroundColor: 'rgba(10, 17, 30, 0.8)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainer: {
    width: '100%',
    height: imageHeight,
    position: 'relative',
  },
  donationImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  imageTitleContainer: {
    position: 'absolute',
    bottom: 12,
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoContainer: {
    padding: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  // Estilos para tags de status
  statusTagContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  waitingTag: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
  },
  waitingText: {
    color: '#000',
  },
  acceptedTag: {
    backgroundColor: 'rgba(40, 167, 69, 0.9)',
  },
  acceptedText: {
    color: '#fff',
  },
  rejectedTag: {
    backgroundColor: 'rgba(220, 53, 69, 0.9)',
  },
  rejectedText: {
    color: '#fff',
  },
  // Estilos para alerta de vencimento
  expirationTag: {
    position: 'absolute',
    top: 10,
    left: 10,
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
});

export default RequestCard; 