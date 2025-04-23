import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckboxFieldProps } from '../types';
import styles from '../styles';

const CheckboxField: React.FC<CheckboxFieldProps> = ({
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
  
  const toggleCheckbox = () => {
    onChange(!value);
  };
  
  return (
    <Animated.View 
      style={[
        styles.inputContainer,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity 
        style={[
          styles.checkboxContainer,
          showError && { backgroundColor: 'rgba(255, 77, 79, 0.1)', padding: 10, borderRadius: 8 }
        ]}
        onPress={toggleCheckbox}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox, 
          value ? styles.checkboxChecked : null,
          showError && { borderColor: '#ff4d4f', borderWidth: 2 }
        ]}>
          {value && <Icon name="check" size={16} color="#FFFFFF" />}
        </View>
        
        <Text style={[
          styles.checkboxLabel,
          showError && { color: '#ff4d4f', fontWeight: 'bold' }
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CheckboxField; 