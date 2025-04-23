import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { EditDonationModalProps, EditDonationFormData, Donation } from '../types';
import FormInput from '../../DonateFood/components/FormInput';
import DatePickerField from '../../DonateFood/components/DatePickerField';
import CheckboxField from '../../DonateFood/components/CheckboxField';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

const EditDonationModal: React.FC<EditDonationModalProps> = ({
  isVisible,
  donation,
  onClose,
  onSave
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EditDonationFormData>({
    id: '',
    foodName: '',
    expirationDate: new Date(),
    description: '',
    district: '',
    preferredPickupTime: '',
    termsAccepted: true,
    images: [],
    imagesToDelete: []
  });
  
  // Array para armazenar os IDs das imagens que serão excluídas
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  
  // Inicializar os dados do formulário quando o modal é aberto
  useEffect(() => {
    if (donation && isVisible) {
      // Converter a string da data de validade para um objeto Date
      const expirationDate = donation.VALIDADE ? new Date(donation.VALIDADE) : new Date();
      
      // Mapear os dados da doação para o formato do formulário
      setFormData({
        id: donation.ID,
        foodName: donation.NOME_ALIMENTO,
        expirationDate,
        description: donation.DESCRICAO || '',
        district: donation.BAIRRO_OU_DISTRITO,
        preferredPickupTime: donation.HORARIO_PREFERIDO || '',
        termsAccepted: true,
        images: donation.imagens_urls || [],
        imagesToDelete: []
      });
      
      // Resetar o array de imagens a serem excluídas
      setImagesToDelete([]);
    }
  }, [donation, isVisible]);
  
  // Função para atualizar o valor de um campo do formulário
  const updateField = (field: keyof EditDonationFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Função para adicionar imagem da galeria
  const pickImage = async () => {
    // Solicitar permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos');
      return;
    }
    
    // Abrir seletor de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Adicionar nova imagem à lista de imagens
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };
  
  // Função para tirar foto com a câmera
  const takePhoto = async () => {
    // Solicitar permissão para acessar a câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar sua câmera');
      return;
    }
    
    // Abrir câmera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Adicionar nova imagem à lista de imagens
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };
  
  // Função para mostrar opções de adicionar imagem
  const showImageOptions = () => {
    Alert.alert(
      'Adicionar foto',
      'Escolha de onde você quer adicionar a foto',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Câmera', onPress: takePhoto },
        { text: 'Galeria', onPress: pickImage },
      ]
    );
  };
  
  // Função para remover uma imagem
  const removeImage = (index: number) => {
    // Se a imagem tem uma URL http, é uma imagem existente que precisa ser marcada para exclusão
    const imageUrl = formData.images[index];
    
    if (imageUrl.startsWith('http') && donation?.imagens_ids && donation.imagens_ids[index]) {
      // Adicionar o ID da imagem à lista de imagens a serem excluídas
      setImagesToDelete(prev => [...prev, donation.imagens_ids[index]]);
    }
    
    // Remover a imagem da lista de imagens
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };
  
  // Função para validar o formulário
  const validateForm = () => {
    if (!formData.foodName.trim()) {
      Alert.alert('Erro', 'O nome do alimento é obrigatório');
      return false;
    }
    
    if (!formData.expirationDate) {
      Alert.alert('Erro', 'A data de validade é obrigatória');
      return false;
    }
    
    if (!formData.district.trim()) {
      Alert.alert('Erro', 'O bairro ou distrito é obrigatório');
      return false;
    }
    
    if (!formData.termsAccepted) {
      Alert.alert('Erro', 'Você precisa aceitar os termos');
      return false;
    }
    
    return true;
  };
  
  // Função para salvar as alterações
  const handleSave = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Incluir a lista de imagens a serem excluídas nos dados do formulário
    const finalFormData = {
      ...formData,
      imagesToDelete
    };
    
    // Chamar a função de salvar do componente pai
    onSave(finalFormData);
    
    // Resetar o estado de loading após 1 segundo (normalmente seria quando a requisição terminar)
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };
  
  if (!donation) return null;
  
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={50} tint="dark" style={styles.blur}>
          <View style={styles.modalView}>
            {/* Cabeçalho do modal */}
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={onClose}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar Doação</Text>
            </View>
            
            {/* Formulário */}
            <ScrollView 
              contentContainerStyle={styles.formContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Nome do alimento */}
              <FormInput
                label="Nome do alimento"
                placeholder="Digite o nome do alimento"
                value={formData.foodName}
                onChangeText={(text) => updateField('foodName', text)}
                icon="package"
                opacity={1}
                translateY={0}
              />
              
              {/* Data de validade */}
              <DatePickerField
                label="Validade do alimento"
                placeholder="Selecione a data de validade"
                value={formData.expirationDate}
                onChange={(date) => updateField('expirationDate', date)}
                opacity={1}
                translateY={0}
              />
              
              {/* Descrição */}
              <FormInput
                label="Descrição (opcional)"
                placeholder="Descreva o alimento, quantidade, etc..."
                value={formData.description}
                onChangeText={(text) => updateField('description', text)}
                multiline={true}
                numberOfLines={3}
                opacity={1}
                translateY={0}
              />
              
              {/* Bairro/Distrito */}
              <FormInput
                label="Localização"
                placeholder="Digite o endereço completo para retirada"
                value={formData.district}
                onChangeText={(text) => updateField('district', text)}
                icon="map-pin"
                opacity={1}
                translateY={0}
              />
              
              {/* Horário preferido */}
              <FormInput
                label="Horário preferido p/ retirada (opcional)"
                placeholder="Ex: Manhã, Tarde, das 14h às 18h"
                value={formData.preferredPickupTime}
                onChangeText={(text) => updateField('preferredPickupTime', text)}
                icon="clock"
                opacity={1}
                translateY={0}
              />
              
              {/* Seleção de imagens */}
              <View style={styles.imagePickerContainer}>
                <Text style={styles.sectionTitle}>Fotos do alimento</Text>
                
                {/* Visualização das imagens existentes */}
                {formData.images.length > 0 && (
                  <View style={styles.imageGrid}>
                    {formData.images.map((uri, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                          <TouchableOpacity
                            style={styles.deleteImageButton}
                            onPress={() => removeImage(index)}
                          >
                            <MaterialIcons name="delete" size={20} color="#FFFFFF" />
                          </TouchableOpacity>
                          <View style={styles.imagePreview}>
                            <LinearGradient
                              colors={['rgba(0,0,0,0.5)', 'transparent']}
                              style={styles.imageGradient}
                            />
                            {uri.startsWith('http') ? (
                              <View style={styles.image}>
                                <TouchableOpacity 
                                  style={styles.imageContent} 
                                  activeOpacity={0.9}
                                >
                                  {/* @ts-ignore */}
                                  <Image 
                                    source={{ uri }} 
                                    style={styles.image} 
                                    resizeMode="cover"
                                  />
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.image}>
                                <TouchableOpacity 
                                  style={styles.imageContent} 
                                  activeOpacity={0.9}
                                >
                                  {/* @ts-ignore */}
                                  <Image 
                                    source={{ uri }} 
                                    style={styles.image} 
                                    resizeMode="cover"
                                  />
                                  <View style={styles.newImageBadge}>
                                    <Text style={styles.newImageText}>Nova</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    ))}
                    
                    {/* Botão para adicionar mais imagens */}
                    <View style={styles.imageWrapper}>
                      <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={showImageOptions}
                      >
                        <Ionicons name="add" size={40} color="rgba(255,255,255,0.7)" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                
                {/* Se não houver imagens, mostrar apenas o botão de adicionar */}
                {formData.images.length === 0 && (
                  <TouchableOpacity 
                    style={styles.addImageButtonFull}
                    onPress={showImageOptions}
                  >
                    <Ionicons name="add" size={24} color="#FFFFFF" />
                    <Text style={styles.addImageText}>Adicionar foto</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {/* Termos */}
              <CheckboxField
                label="Declaro que o alimento está em boas condições de higiene e consumo"
                value={formData.termsAccepted}
                onChange={(checked) => updateField('termsAccepted', checked)}
                opacity={1}
                translateY={0}
              />
              
              {/* Botões de ação */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <MaterialIcons name="save" size={20} color="#FFFFFF" />
                      <Text style={styles.buttonText}>Salvar</Text>
                    </>
                  )}
                </TouchableOpacity>
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
    maxHeight: height * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'rgba(2, 9, 22, 0.8)',
    borderRadius: 20,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  imagePickerContainer: {
    marginVertical: 15,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteImageButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 10,
    backgroundColor: 'rgba(255, 45, 85, 0.8)',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  },
  newImageBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(18, 176, 91, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newImageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addImageButton: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderStyle: 'dashed',
  },
  addImageButtonFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(18, 176, 91, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(18, 176, 91, 0.3)',
    borderStyle: 'dashed',
  },
  addImageText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  cancelButton: {
    backgroundColor: 'rgba(120, 120, 120, 0.7)',
  },
  saveButton: {
    backgroundColor: 'rgb(46, 182, 125)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default EditDonationModal; 