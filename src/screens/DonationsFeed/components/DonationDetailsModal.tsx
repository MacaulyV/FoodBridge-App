import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DonationDetailsModalProps } from '../types';
import CustomAlert from '../../../components/CustomAlert';
import { isExpired, formatDateBR, getExpirationText } from '../../../utils/dateUtils';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

/**
 * Modal que exibe os detalhes de uma doação disponível
 */
const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
  isVisible,
  donation,
  onClose,
  onConfirmRequest
}) => {
  // Estado para controlar o índice da imagem atual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Estado para controlar o alerta de validade expirada
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  
  // Resetar o índice da imagem quando o modal é fechado
  useEffect(() => {
    if (!isVisible) {
      setCurrentImageIndex(0);
    }
  }, [isVisible]);
  
  if (!donation) return null;
  
  // Verificar se há imagens disponíveis
  const hasImages = donation.imagens_urls && donation.imagens_urls.length > 0;
  
  // Obter o número total de imagens
  const totalImages = hasImages && donation.imagens_urls ? donation.imagens_urls.length : 0;
  
  // Obter a URL da imagem atual ou usar um placeholder
  const imageUrl = hasImages && donation.imagens_urls 
    ? donation.imagens_urls[currentImageIndex]
    : 'https://via.placeholder.com/400?text=Sem+Imagem';
  
  // Verificar se a doação está vencida
  const donationExpired = isExpired(donation.VALIDADE);
  
  // Navegar para a próxima imagem
  const handleNextImage = () => {
    if (hasImages && currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  
  // Navegar para a imagem anterior
  const handlePreviousImage = () => {
    if (hasImages && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  // Manipular solicitação de doação
  const handleRequestDonation = () => {
    // Verificar se a doação está vencida
    if (donationExpired) {
      // Mostrar alerta customizado
      setIsAlertVisible(true);
    } else {
      // Prosseguir com a solicitação
      onConfirmRequest(donation);
    }
  };
  
  // Manipular fechamento do alerta
  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };
  
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={50} tint="dark" style={styles.blur}>
          <View style={styles.modalView}>
            {/* Botão de fechar */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Carrossel de imagens do alimento */}
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.image} 
                  resizeMode="cover" 
                />
                
                {/* Navegação entre imagens */}
                {hasImages && totalImages > 1 && (
                  <>
                    {/* Indicador de número de imagens */}
                    <View style={styles.imageCounter}>
                      <Text style={styles.imageCounterText}>
                        {currentImageIndex + 1}/{totalImages}
                      </Text>
                    </View>
                    
                    {/* Botão para imagem anterior */}
                    {currentImageIndex > 0 && (
                      <TouchableOpacity 
                        style={[styles.imageNavButton, styles.prevImageButton]} 
                        onPress={handlePreviousImage}
                      >
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}
                    
                    {/* Botão para próxima imagem */}
                    {currentImageIndex < totalImages - 1 && (
                      <TouchableOpacity 
                        style={[styles.imageNavButton, styles.nextImageButton]} 
                        onPress={handleNextImage}
                      >
                        <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
                      </TouchableOpacity>
                    )}
                  </>
                )}
                
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.imageGradient}
                />
                <Text style={styles.foodName}>{donation.NOME_ALIMENTO}</Text>
              </View>
              
              {/* Detalhes da doação */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <MaterialIcons 
                    name="date-range" 
                    size={20} 
                    color={donationExpired ? "#FF4A4A" : "#4783C0"} 
                  />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Data de Validade</Text>
                    <Text style={[
                      styles.detailValue,
                      donationExpired && styles.expiredText
                    ]}>
                      {formatDateBR(donation.VALIDADE)}
                      {donationExpired && " (Vencido)"}
                    </Text>
                    <Text style={[
                      styles.expirationHint,
                      donationExpired && styles.expiredText
                    ]}>
                      {getExpirationText(donation.VALIDADE)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={20} color="#4783C0" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Localização</Text>
                    <Text style={styles.detailValue}>
                      {donation.BAIRRO_OU_DISTRITO}
                    </Text>
                  </View>
                </View>
                
                {donation.HORARIO_PREFERIDO && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={20} color="#4783C0" />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Horário Preferido</Text>
                      <Text style={styles.detailValue}>
                        {donation.HORARIO_PREFERIDO}
                      </Text>
                    </View>
                  </View>
                )}
                
                {donation.DESCRICAO && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Descrição</Text>
                    <Text style={styles.descriptionText}>
                      {donation.DESCRICAO}
                    </Text>
                  </View>
                )}
                
                {/* Botão de solicitação */}
                <TouchableOpacity 
                  style={[
                    styles.requestButton,
                    donationExpired && styles.requestButtonWarning
                  ]} 
                  onPress={handleRequestDonation}
                >
                  <Ionicons name="hand-right" size={20} color="#FFFFFF" />
                  <Text style={styles.requestButtonText}>
                    {donationExpired ? "Solicitar Mesmo Assim" : "Confirmar Solicitação"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </BlurView>
      </View>
      
      {/* Alerta customizado para doações vencidas */}
      <CustomAlert
        visible={isAlertVisible}
        title="Alimento Vencido"
        message="Validade expirada. Recomendamos verificar com o doador se o item ainda está em boas condições. Deseja seguir com a solicitação?"
        type="warning"
        confirmText="Entendo os riscos"
        cancelText="Cancelar"
        onConfirm={() => {
          setIsAlertVisible(false);
          onConfirmRequest(donation);
        }}
        onCancel={handleCloseAlert}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    backgroundColor: 'rgba(2, 9, 22, 0.8)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageCounterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageNavButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevImageButton: {
    left: 10,
  },
  nextImageButton: {
    right: 10,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  foodName: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  expiredText: {
    color: '#FF4A4A',
  },
  expirationHint: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 5,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#DDDDDD',
    lineHeight: 22,
  },
  requestButton: {
    backgroundColor: '#12B05B',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  requestButtonWarning: {
    backgroundColor: '#FF9800',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default DonationDetailsModal; 