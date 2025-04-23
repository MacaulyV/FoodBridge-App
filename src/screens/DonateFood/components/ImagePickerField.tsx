import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerFieldProps } from '../types';
import styles from '../styles';

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  error,
  touched,
  opacity,
  translateY,
}) => {
  // Determinar se temos um erro para mostrar
  const showError = error && touched;
  
  // Função para selecionar imagem da biblioteca
  const pickImage = async () => {
    // Pedir permissão para acessar a biblioteca de imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de permissão para acessar suas fotos.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Abrir o seletor de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Adicionar a nova imagem à lista existente
      onChange([...value, result.assets[0].uri]);
    }
  };
  
  // Função para tirar uma foto com a câmera
  const takePhoto = async () => {
    // Pedir permissão para acessar a câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de permissão para acessar sua câmera.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Abrir a câmera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Adicionar a nova imagem à lista existente
      onChange([...value, result.assets[0].uri]);
    }
  };
  
  // Remover uma imagem
  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };
  
  // Exibir opções para escolher entre câmera e galeria
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
  
  return (
    <Animated.View 
      style={[
        styles.imagePickerContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      
      <TouchableOpacity 
        style={styles.addImageButton}
        onPress={showImageOptions}
        activeOpacity={0.7}
      >
        <Icon name="plus" size={18} color="#FFFFFF" />
        <Text style={styles.addImageText}>Adicionar Foto do Alimento</Text>
      </TouchableOpacity>
      
      {value.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {value.map((uri, index) => (
            <View key={index} style={styles.imageThumbnailContainer}>
              <Image 
                source={{ uri }} 
                style={styles.imageThumbnail} 
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Icon name="x" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

export default ImagePickerField; 