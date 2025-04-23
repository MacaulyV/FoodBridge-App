import React from 'react';
import { Animated, Text, TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormInputProps } from '../types';
import styles from '../styles';

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  secureTextEntry = false,
  opacity,
  translateY,
  icon,
  keyboardType = 'default',
  value,
  onChangeText,
  error,
  touched,
  onBlur,
}) => {
  // Cores para os ícones
  const iconColor = touched && error ? '#ff4d4f' : '#4CAF50';
  
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
      
      {icon ? (
        <View style={[
          styles.inputWithIcon,
          touched && error ? { borderColor: '#ff4d4f' } : {}
        ]}>
          <Ionicons 
            name={icon} 
            size={18} 
            color={iconColor}
            style={[
              styles.inputIcon,
              iconStyles.enhancedIcon
            ]}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
        </View>
      ) : (
        <TextInput
          style={[
            styles.input,
            touched && error ? { borderColor: '#ff4d4f' } : {}
          ]}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      )}
      
      {touched && error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </Animated.View>
  );
};

// Estilos adicionais para os ícones
const iconStyles = StyleSheet.create({
  enhancedIcon: {
    textShadowColor: 'rgba(76, 175, 80, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    elevation: 2,
  }
});

export default FormInput; 