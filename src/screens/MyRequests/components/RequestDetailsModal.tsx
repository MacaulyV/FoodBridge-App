import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { RequestDetailsModalProps } from '../types';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

/**
 * Modal para exibir detalhes de uma solicitação
 */
const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  isVisible,
  request,
  onClose,
  onRemove
}) => {
  if (!request) return null;
  
  // Formatar data para exibição
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Data não disponível';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Renderizar tag de status
  const renderStatusTag = () => {
    switch (request.STATUS) {
      case 'AGUARDANDO':
        return (
          <View style={[styles.statusTagContainer, { borderRadius: 25, overflow: 'hidden', position: 'relative', paddingHorizontal: 0, paddingVertical: 0 }]}>
            <LinearGradient
              colors={['#FFD700', '#FFC107', '#FFAA00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statusTagGradient}
            />
            <View style={styles.statusTagContent}>
              <Ionicons name="time-outline" size={16} color="#000" />
              <Text style={styles.waitingText}>Aguardando</Text>
            </View>
          </View>
        );
      case 'ACEITA':
        return (
          <View style={[styles.statusTagContainer, styles.acceptedTag]}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#fff" />
            <Text style={[styles.statusText, styles.acceptedText]}>Aceita</Text>
          </View>
        );
      case 'RECUSADA':
        return (
          <View style={[styles.statusTagContainer, styles.rejectedTag]}>
            <Ionicons name="close-circle-outline" size={16} color="#fff" />
            <Text style={[styles.statusText, styles.rejectedText]}>Recusada</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={50} style={styles.blur} tint="dark">
          <View style={styles.modalView}>
            {/* Gradiente de fundo igual aos cards */}
            <LinearGradient
              colors={['#070F1B', '#0D1723', '#182B3A']}
              style={styles.modalGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Botão para fechar o modal */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Imagem da doação */}
              <View style={styles.imageContainer}>
                {request.donation?.imagens_urls && request.donation.imagens_urls.length > 0 ? (
                  <Image
                    source={{ uri: request.donation.imagens_urls[0] }}
                    style={styles.donationImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Ionicons name="fast-food-outline" size={60} color="rgba(255, 255, 255, 0.5)" />
                  </View>
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.imageGradient}
                />
                <Text style={styles.foodName}>{request.donation?.NOME_ALIMENTO || 'Doação não disponível'}</Text>
              </View>
              
              {/* Cabeçalho */}
              <View style={styles.headerContainer}>
                {renderStatusTag()}
              </View>

              {/* Informações da doação */}
              <View style={styles.infoSection}>
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={20} color="#12B05B" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Localização</Text>
                    <Text style={styles.detailValue}>
                      {request.donation?.BAIRRO_OU_DISTRITO || 'Localização não disponível'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={20} color="#12B05B" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Validade</Text>
                    <Text style={styles.detailValue}>
                      {request.donation?.VALIDADE ? formatDate(request.donation.VALIDADE) : 'Não informada'}
                    </Text>
                  </View>
                </View>
                
                {request.donation?.HORARIO_PREFERIDO && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={20} color="#12B05B" />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Horário preferido</Text>
                      <Text style={styles.detailValue}>
                        {request.donation.HORARIO_PREFERIDO}
                      </Text>
                    </View>
                  </View>
                )}
                
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-number-outline" size={20} color="#12B05B" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Data da solicitação</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(request.DATA_SOLICITACAO)}
                    </Text>
                  </View>
                </View>
                
                {/* Descrição */}
                {request.donation?.DESCRICAO && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Descrição:</Text>
                    <Text style={styles.descriptionText}>{request.donation.DESCRICAO}</Text>
                  </View>
                )}
                
                {/* Status da solicitação */}
                <View style={styles.statusContainer}>
                  <Text style={styles.statusTitle}>Status da Solicitação:</Text>
                  <Text style={[
                    styles.statusDesc,
                    request.STATUS === 'ACEITA' ? styles.statusAccepted :
                    request.STATUS === 'RECUSADA' ? styles.statusRejected :
                    styles.statusWaiting
                  ]}>
                    {request.STATUS === 'AGUARDANDO' && 'Aguardando resposta do doador.'}
                    {request.STATUS === 'ACEITA' && 'Solicitação aceita pelo doador!'}
                    {request.STATUS === 'RECUSADA' && 'Solicitação recusada pelo doador.'}
                  </Text>
                </View>
              </View>
              
              {/* Botão para cancelar solicitação */}
              <TouchableOpacity
                onPress={() => onRemove(request)}
                style={[
                  styles.removeButton,
                  {
                    borderRadius: 25,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: 'transparent',
                    borderWidth: 0
                  }
                ]}
              >
                <LinearGradient
                  colors={['#FF0000', '#FF3B30', '#F53B3B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cancelGradient}
                />
                <Ionicons name="close-circle-outline" size={20} color="white" style={{ marginRight: 8, zIndex: 1 }} />
                <Text
                  style={[
                    styles.removeButtonText,
                    { 
                      color: '#FFFFFF',
                      textShadowColor: 'rgba(0, 0, 0, 0.2)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 3,
                      zIndex: 1
                    }
                  ]}
                >
                  Cancelar Solicitação
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: 'rgba(10, 17, 30, 0.8)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  modalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  donationImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  foodName: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  infoSection: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 2,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  descriptionLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
  statusContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  statusTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDesc: {
    fontSize: 15,
    lineHeight: 22,
  },
  statusAccepted: {
    color: '#28A745',
  },
  statusRejected: {
    color: '#DC3545',
  },
  statusWaiting: {
    color: '#FFC107',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 10,
    height: 54,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusTagContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  statusTagGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  statusTagContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  waitingText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
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
  cancelGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default RequestDetailsModal; 