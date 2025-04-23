import React, { useState } from 'react';
import { 
  Animated, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  FlatList, 
  Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectInputProps } from '../types';
import styles from '../styles';

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  opacity,
  translateY,
  error,
  touched,
  onBlur,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Encontrar o label do item selecionado
  const selectedLabel = options.find(option => option.value === selectedValue)?.label || 'Selecione...';
  
  // Função para selecionar uma opção
  const handleSelectOption = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
    // Chamar onBlur após seleção para validar
    if (onBlur) onBlur();
  };
  
  // Função para mostrar o modal
  const handlePress = () => {
    setModalVisible(true);
    // Chamar onBlur quando o usuário pressiona o seletor
    if (onBlur) onBlur();
  };
  
  return (
    <Animated.View 
      style={[
        styles.inputContainer,
        {
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      
      <TouchableOpacity
        style={[
          styles.selectContainer,
          touched && error ? { borderColor: '#ff4d4f' } : {}
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[
            styles.selectText, 
            { color: selectedValue ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)' }
          ]}>
            {selectedLabel}
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color={touched && error ? '#ff4d4f' : '#4CAF50'} 
          />
        </View>
      </TouchableOpacity>
      
      {touched && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      
      {/* Modal para seleção de opções */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            justifyContent: 'center' 
          }}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.pickerModal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ 
                    padding: 15, 
                    borderBottomWidth: 1, 
                    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: item.value === selectedValue ? 'rgba(76, 175, 80, 0.3)' : 'transparent' 
                  }}
                  onPress={() => handleSelectOption(item.value)}
                >
                  <Text style={styles.pickerItem}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
};

export default SelectInput; 