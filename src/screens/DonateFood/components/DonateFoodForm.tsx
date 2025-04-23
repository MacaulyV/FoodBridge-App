import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DonateFoodFormProps } from '../types';
import styles from '../styles';

// Componentes do formulário
import FormInput from './FormInput';
import DatePickerField from './DatePickerField';
import ImagePickerField from './ImagePickerField';
import CheckboxField from './CheckboxField';

// Hook personalizado
import { useDonationForm } from '../hooks/useDonationForm';

const DonateFoodForm: React.FC<DonateFoodFormProps> = ({
  inputsOpacity,
  inputsTranslateY,
  onDonate,
  buttonOpacity,
  buttonScale,
  isLoading = false,
}) => {
  // Usar o hook de formulário
  const {
    formData,
    errors,
    touched,
    updateFormField,
    handleBlur,
    validateForm,
  } = useDonationForm();
  
  // Animação de pulse para o botão
  const [pulseAnimation] = useState(new Animated.Value(1));
  // Estado para controlar se os campos obrigatórios estão válidos
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Verificar se todos os campos obrigatórios estão preenchidos
  useEffect(() => {
    const requiredFieldsValid = 
      formData.foodName && 
      formData.foodName.trim() !== '' && 
      formData.expirationDate !== null &&
      formData.district && 
      formData.district.trim() !== '';
    
    setIsFormValid(!!requiredFieldsValid);
  }, [formData]);
  
  // Função para animar o pulse do botão
  const animatePulse = () => {
    if (isFormValid) {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  
  // Função para lidar com a submissão do formulário
  const handleSubmit = () => {
    // Validar todo o formulário antes de prosseguir
    const isValid = validateForm();
    
    if (isValid) {
      // Animar o botão se o formulário for válido
      animatePulse();
      // Se o formulário for válido, chamar a função de doação com os dados
      onDonate(formData);
    } else {
      // Se o formulário não for válido, marcar todos os campos como tocados
      // para exibir todos os erros
      handleBlur('foodName');
      handleBlur('expirationDate');
      handleBlur('district');
      handleBlur('preferredPickupTime');
      handleBlur('description');
      handleBlur('images');
      handleBlur('termsAccepted');
    }
  };
  
  return (
    <View style={{ width: '100%', flex: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <LinearGradient
            colors={['#070F1B', '#0D1723', '#182B3A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.formGradient}
          >
            {/* Nome do Alimento */}
            <FormInput
              label="Nome do alimento"
              placeholder="Digite o nome do alimento"
              value={formData.foodName}
              onChangeText={(text) => updateFormField('foodName', text)}
              error={errors.foodName}
              touched={touched.foodName}
              onBlur={() => handleBlur('foodName')}
              opacity={inputsOpacity[0]}
              translateY={inputsTranslateY[0]}
              icon="package"
            />
            
            {/* Data de Validade */}
            <DatePickerField
              label="Validade do alimento"
              placeholder="Selecione a data de validade"
              value={formData.expirationDate}
              onChange={(date) => updateFormField('expirationDate', date)}
              error={errors.expirationDate}
              touched={touched.expirationDate}
              onBlur={() => handleBlur('expirationDate')}
              opacity={inputsOpacity[1]}
              translateY={inputsTranslateY[1]}
            />
            
            {/* Descrição */}
            <FormInput
              label="Descrição (opcional)"
              placeholder="Descreva o alimento, quantidade, etc..."
              value={formData.description}
              onChangeText={(text) => updateFormField('description', text)}
              error={errors.description}
              touched={touched.description}
              onBlur={() => handleBlur('description')}
              opacity={inputsOpacity[2]}
              translateY={inputsTranslateY[2]}
              multiline={true}
              numberOfLines={3}
            />
            
            {/* Bairro ou Distrito */}
            <FormInput
              label="Endereço da retirada"
              placeholder="Digite o endereço para retirada"
              value={formData.district}
              onChangeText={(text) => updateFormField('district', text)}
              error={errors.district}
              touched={touched.district}
              onBlur={() => handleBlur('district')}
              opacity={inputsOpacity[3]}
              translateY={inputsTranslateY[3]}
              icon="map-pin"
            />
            
            {/* Horário Preferido */}
            <FormInput
              label="Horário preferido p/ retirada (opcional)"
              placeholder="Ex: Manhã, Tarde, das 14h às 18h"
              value={formData.preferredPickupTime}
              onChangeText={(text) => updateFormField('preferredPickupTime', text)}
              error={errors.preferredPickupTime}
              touched={touched.preferredPickupTime}
              onBlur={() => handleBlur('preferredPickupTime')}
              opacity={inputsOpacity[4]}
              translateY={inputsTranslateY[4]}
              icon="clock"
            />
            
            {/* Seletor de imagens */}
            <ImagePickerField
              label="Fotos do alimento"
              value={formData.images}
              onChange={(images) => updateFormField('images', images)}
              error={errors.images}
              touched={touched.images}
              opacity={inputsOpacity[5]}
              translateY={inputsTranslateY[5]}
            />
            
            {/* Termo de declaração */}
            <CheckboxField
              label="Declaro que o alimento está em boas condições de higiene e consumo"
              value={formData.termsAccepted}
              onChange={(checked) => updateFormField('termsAccepted', checked)}
              error={errors.termsAccepted}
              touched={touched.termsAccepted}
              opacity={inputsOpacity[6]}
              translateY={inputsTranslateY[6]}
            />
          </LinearGradient>
        </View>
      </ScrollView>
      
      {/* Botão fixo na parte inferior da tela */}
      <Animated.View
        style={[
          styles.fixedFooter,
          {
            opacity: buttonOpacity,
          }
        ]}
      >
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: '100%', paddingVertical: 15 }}
        >
          <Animated.View
            style={{
              transform: [
                { scale: Animated.multiply(buttonScale, pulseAnimation) }
              ],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[
                styles.donateButton,
                !isFormValid && styles.disabledButton
              ]}
              onPress={handleSubmit}
              activeOpacity={isFormValid ? 0.8 : 1}
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Publicar Doação</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default DonateFoodForm;