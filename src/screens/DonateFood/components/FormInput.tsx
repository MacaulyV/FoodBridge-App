import React from 'react';
import { View, Text, TextInput, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormInputProps } from '../types';
import styles from '../styles';

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  onBlur,
  opacity,
  translateY,
  icon,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}) => {
  // Determinar se temos um erro para mostrar
  const showError = error && touched;
  
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
      <Text style={styles.inputLabel}>{label}</Text>
      
      {icon ? (
        <View style={styles.inputWithIcon}>
          <Icon name={icon} size={18} color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            keyboardType={keyboardType}
            secureTextEntry={false}
            multiline={multiline}
            numberOfLines={numberOfLines}
            selectionColor="#FFFFFF"
            autoCapitalize="none"
          />
        </View>
      ) : (
        <TextInput
          style={[
            styles.input, 
            multiline && styles.multilineInput
          ]}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={false}
          multiline={multiline}
          numberOfLines={numberOfLines}
          selectionColor="#FFFFFF"
          autoCapitalize="none"
        />
      )}
      
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </Animated.View>
  );
};

export default FormInput; 