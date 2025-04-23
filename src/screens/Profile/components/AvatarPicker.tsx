import React, { useState, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Modal, 
  Alert, 
  ActivityIndicator,
  Platform,
  BackHandler
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AvatarPickerProps } from '../types';
import { ProfileImageService } from '../../../services/ProfileImageService';

const AvatarPicker: React.FC<AvatarPickerProps> = ({ 
  onImageSelected, 
  visible, 
  onClose 
}) => {
  const [loading, setLoading] = useState(false);
  
  // Manipula o botão de voltar do Android
  useEffect(() => {
    const backAction = () => {
      if (visible && !loading) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible, loading, onClose]);
  
  // Função para tirar foto usando a câmera
  const takePicture = async () => {
    try {
      setLoading(true);
      
      // Solicitar permissão para usar a câmera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Negada', 
          'Precisamos de permissão para acessar sua câmera para tirar uma foto de perfil.'
        );
        setLoading(false);
        return;
      }
      
      // Abrir a câmera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        console.log("Imagem capturada com a câmera:", selectedImageUri);
        
        // Salvar a imagem usando o serviço
        const success = await ProfileImageService.saveProfileImage(selectedImageUri);
        
        if (success) {
          // Obter a nova URI do armazenamento permanente
          const savedUri = await ProfileImageService.getProfileImage();
          
          if (savedUri) {
            // Notificar o componente pai sobre a nova imagem
            console.log("Imagem salva permanentemente:", savedUri);
            onImageSelected(savedUri);
          } else {
            // Caso não consiga recuperar a imagem salva, usar a original
            console.log("Usando URI temporária:", selectedImageUri);
            onImageSelected(selectedImageUri);
          }
        } else {
          // Em caso de erro, usar a URI temporária
          console.log("Falha ao salvar permanentemente, usando URI temporária:", selectedImageUri);
          onImageSelected(selectedImageUri);
          Alert.alert(
            'Aviso',
            'A imagem foi selecionada, mas pode não persistir após reiniciar o aplicativo.'
          );
        }
        
        onClose();
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tirar a foto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    try {
      setLoading(true);
      
      // Solicitar permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão Negada', 
          'Precisamos de permissão para acessar sua galeria para selecionar uma imagem de perfil.'
        );
        setLoading(false);
        return;
      }
      
      // Abrir a galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        console.log("Imagem selecionada da galeria:", selectedImageUri);
        
        // Salvar a imagem usando o serviço
        const success = await ProfileImageService.saveProfileImage(selectedImageUri);
        
        if (success) {
          // Obter a nova URI do armazenamento permanente
          const savedUri = await ProfileImageService.getProfileImage();
          
          if (savedUri) {
            // Notificar o componente pai sobre a nova imagem
            console.log("Imagem salva permanentemente:", savedUri);
            onImageSelected(savedUri);
          } else {
            // Caso não consiga recuperar a imagem salva, usar a original
            console.log("Usando URI temporária:", selectedImageUri);
            onImageSelected(selectedImageUri);
          }
        } else {
          // Em caso de erro, usar a URI temporária
          console.log("Falha ao salvar permanentemente, usando URI temporária:", selectedImageUri);
          onImageSelected(selectedImageUri);
          Alert.alert(
            'Aviso',
            'A imagem foi selecionada, mas pode não persistir após reiniciar o aplicativo.'
          );
        }
        
        onClose();
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={Platform.OS === 'ios' ? 90 : 70} style={styles.blurView}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Alterar Foto de Perfil</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={onClose}
                disabled={loading}
              >
                <Ionicons name="close" size={28} color="rgba(255, 255, 255, 0.8)" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.subtitle}>
              Escolha uma nova foto para o seu perfil
            </Text>
            
            <TouchableOpacity 
              style={styles.option} 
              onPress={takePicture}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="camera-outline" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Tirar foto com a câmera</Text>
                <Text style={styles.optionDescription}>Use a câmera para capturar uma nova foto</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.option} 
              onPress={pickImage}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="image-outline" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Selecionar da galeria</Text>
                <Text style={styles.optionDescription}>Escolha uma imagem da sua galeria</Text>
              </View>
            </TouchableOpacity>
            
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#12B05B" />
                <Text style={styles.loadingText}>Processando imagem...</Text>
              </View>
            )}
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  blurView: {
    width: '85%',
    maxWidth: 350,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentContainer: {
    padding: 24,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 56, 
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(18, 176, 91, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 14,
  },
});

export default AvatarPicker; 