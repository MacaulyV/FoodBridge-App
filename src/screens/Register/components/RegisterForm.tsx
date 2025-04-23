import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { RegisterFormProps, RegisterFormData, UserType, FormErrors, TouchedFields } from '../types';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import styles from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterForm: React.FC<RegisterFormProps> = ({
  userType,
  inputsOpacity,
  inputsTranslateY,
  onRegister,
  buttonOpacity,
  buttonScale,
  isLoading = false,
}) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    city: '',
    district: '',
    donorType: userType === 'donor' ? 'individual' : undefined,
    receiverType: userType === 'receiver' ? 'individual' : undefined,
  });
  
  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para armazenar campos que foram tocados
  const [touched, setTouched] = useState<TouchedFields>({});
  
  // Estado para verificar se o formulário está válido
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Atualizar um campo específico do formulário
  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Validar o campo em tempo real
      validateForm(newData);
      
      return newData;
    });
  };
  
  // Marcar um campo como tocado quando o usuário sai do campo
  const handleBlur = (field: keyof FormErrors) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  // Opções para o tipo de doador
  const donorTypeOptions = [
    { label: 'Pessoa Física', value: 'individual' },
    { label: 'Pessoa Jurídica', value: 'business' },
  ];
  
  // Opções para o tipo de receptor
  const receiverTypeOptions = [
    { label: 'Pessoa Física', value: 'individual' },
    { label: 'ONG', value: 'ngo' },
  ];
  
  // Validar todo o formulário e atualizar os erros
  const validateForm = (data: RegisterFormData = formData) => {
    const newErrors: FormErrors = {};
    
    // Nome completo
    if (!data.fullName.trim()) {
      newErrors.fullName = 'O nome completo é obrigatório';
    } else {
      const words = data.fullName.trim().split(/\s+/);
      if (words.length < 2) {
        newErrors.fullName = 'Informe nome e sobrenome';
      } else if (words.some((word: string) => word.length < 2)) {
        newErrors.fullName = 'Digite o seu nome completo';
      }
    }
    
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Digite um email válido (ex: nome@dominio.com)';
    }
    
    // Senha
    if (!data.password) {
      newErrors.password = 'A senha é obrigatória';
    } else if (data.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    // Cidade
    if (!data.city.trim()) {
      newErrors.city = 'A cidade é obrigatória';
    } else if (data.city.trim().length < 3) {
      newErrors.city = 'A cidade deve ter pelo menos 3 caracteres';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.city)) {
      newErrors.city = 'A cidade deve conter apenas letras e espaços';
    }
    
    // Bairro
    if (!data.district.trim()) {
      newErrors.district = 'O bairro é obrigatório';
    } else if (data.district.trim().length < 3) {
      newErrors.district = 'O bairro deve ter pelo menos 3 caracteres';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.district)) {
      newErrors.district = 'O bairro deve conter apenas letras e espaços';
    }
    
    // Tipo de doador (se aplicável)
    if (userType === 'donor' && !data.donorType) {
      newErrors.donorType = 'O tipo de doador é obrigatório';
    }
    
    // Tipo de receptor (se aplicável)
    if (userType === 'receiver' && !data.receiverType) {
      newErrors.receiverType = 'O tipo de receptor é obrigatório';
    }
    
    // Atualizar estado de erros
    setErrors(newErrors);
    
    // Verificar se o formulário está válido (não há erros)
    const valid = Object.keys(newErrors).length === 0;
    setIsFormValid(valid);
    
    return valid;
  };
  
  // Processar o registro quando o botão for pressionado
  const handleRegister = () => {
    // Marcar todos os campos como tocados
    const allFields: (keyof TouchedFields)[] = [
      'fullName', 'email', 'password', 'city', 'district',
      'donorType', 'receiverType'
    ];
    
    const touchedState = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as TouchedFields);
    
    setTouched(touchedState);
    
    // Validar todo o formulário
    const isValid = validateForm();
    
    // Se válido, chamar a função de registro
    if (isValid) {
      onRegister(formData);
    }
  };
  
  // Aplicar as validações no carregamento e quando o tipo de usuário mudar
  useEffect(() => {
    validateForm();
  }, [userType]);
  
  // Formatadores e validadores para os campos
  const formatAlphaOnly = (text: string) => {
    // Permitir apenas letras e espaços
    return text.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  };
  
  return (
    <>
      <View style={styles.formContainer}>
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.formGradient}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled={true}
          >
            {/* Campos comuns para qualquer tipo de usuário */}
            <FormInput
              label="Nome completo"
              placeholder="Digite seu nome completo"
              opacity={inputsOpacity[0]}
              translateY={inputsTranslateY[0]}
              icon="person-outline"
              value={formData.fullName}
              onChangeText={(text) => updateField('fullName', formatAlphaOnly(text))}
              error={errors.fullName}
              touched={touched.fullName}
              onBlur={() => handleBlur('fullName')}
            />
            
            <FormInput
              label="Email"
              placeholder="Digite seu email"
              opacity={inputsOpacity[1]}
              translateY={inputsTranslateY[1]}
              icon="mail-outline"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              error={errors.email}
              touched={touched.email}
              onBlur={() => handleBlur('email')}
            />
            
            <FormInput
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
              opacity={inputsOpacity[2]}
              translateY={inputsTranslateY[2]}
              icon="lock-closed-outline"
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              error={errors.password}
              touched={touched.password}
              onBlur={() => handleBlur('password')}
            />
            
            <FormInput
              label="Cidade"
              placeholder="Digite sua cidade"
              opacity={inputsOpacity[3]}
              translateY={inputsTranslateY[3]}
              icon="location-outline"
              value={formData.city}
              onChangeText={(text) => updateField('city', formatAlphaOnly(text))}
              error={errors.city}
              touched={touched.city}
              onBlur={() => handleBlur('city')}
            />
            
            <FormInput
              label="Bairro ou Distrito"
              placeholder="Digite seu bairro ou distrito"
              opacity={inputsOpacity[4]}
              translateY={inputsTranslateY[4]}
              icon="home-outline"
              value={formData.district}
              onChangeText={(text) => updateField('district', formatAlphaOnly(text))}
              error={errors.district}
              touched={touched.district}
              onBlur={() => handleBlur('district')}
            />
            
            {/* Campos condicionais baseados no tipo de usuário */}
            {userType === 'donor' && (
              <SelectInput
                label="Tipo de doador"
                options={donorTypeOptions}
                selectedValue={formData.donorType || ''}
                onValueChange={(value) => updateField('donorType', value)}
                opacity={inputsOpacity[5]}
                translateY={inputsTranslateY[5]}
                error={errors.donorType}
                touched={touched.donorType}
                onBlur={() => handleBlur('donorType')}
              />
            )}
            
            {userType === 'receiver' && (
              <SelectInput
                label="Tipo de receptor"
                options={receiverTypeOptions}
                selectedValue={formData.receiverType || ''}
                onValueChange={(value) => updateField('receiverType', value)}
                opacity={inputsOpacity[5]}
                translateY={inputsTranslateY[5]}
                error={errors.receiverType}
                touched={touched.receiverType}
                onBlur={() => handleBlur('receiverType')}
              />
            )}
          </ScrollView>
        </LinearGradient>
      </View>
      
      {/* Botão de cadastro com gradiente condicional */}
      <Animated.View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 25,
          marginBottom: 50,
          opacity: buttonOpacity,
          transform: [
            { scale: buttonScale },
            { translateY: -20 }
          ]
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRegister}
          style={buttonStyles.buttonContainer}
          disabled={isLoading}
        >
          {isFormValid ? (
            <LinearGradient
              colors={['#FF9800', '#F57C00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={buttonStyles.gradient}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={['#32CD32', '#2ECC40']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={buttonStyles.gradient}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </LinearGradient>
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

// Estilos adicionais para o botão com gradiente
const buttonStyles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RegisterForm; 