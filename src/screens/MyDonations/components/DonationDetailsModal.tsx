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
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DonationDetailsModalProps } from '../types';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

/**
 * Modal que exibe os detalhes de uma doação
 */
const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
  isVisible,
  donation,
  onClose,
  onEdit,
  onDelete
}) => {
  // Estado para controlar o índice da imagem atual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
  const totalImages = hasImages ? donation.imagens_urls.length : 0;
  
  // Obter a URL da imagem atual ou usar um placeholder
  const imageUrl = hasImages 
    ? donation.imagens_urls[currentImageIndex]
    : 'https://via.placeholder.com/400?text=Sem+Imagem';
  
  // Formatar a data de validade
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
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
                  <MaterialIcons name="date-range" size={20} color="#4CAF50" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Data de Validade</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(donation.VALIDADE)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="location-outline" size={20} color="#4CAF50" />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Localização</Text>
                    <Text style={styles.detailValue}>
                      {donation.BAIRRO_OU_DISTRITO}
                    </Text>
                  </View>
                </View>
                
                {donation.HORARIO_PREFERIDO && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={20} color="#4CAF50" />
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
                
                {/* Botões de ação */}
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]} 
                    onPress={() => onEdit(donation)}
                  >
                    <MaterialIcons name="edit" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]} 
                    onPress={() => onDelete(donation)}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  blur: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'rgba(2, 9, 22, 0.8)',
    borderRadius: 20,
    maxHeight: height * 0.85,
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  foodName: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  imageNavButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  prevImageButton: {
    left: 10,
  },
  nextImageButton: {
    right: 10,
  },
  imageCounter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 5,
  },
  imageCounterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(1, 8, 31, 0.54)',
    padding: 15,
    borderRadius: 15,
  },
  descriptionLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    flex: 0.45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  editButton: {
    backgroundColor: 'rgb(46, 182, 125)',
  },
  deleteButton: {
    backgroundColor: 'rgb(255, 45, 85)',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default DonationDetailsModal; 