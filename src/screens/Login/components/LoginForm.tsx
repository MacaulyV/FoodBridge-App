import React, { useState, useRef, useEffect } from 'react';
import { 
  Animated, 
  Text, 
  TouchableOpacity, 
  View,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LoginFormProps, LoginFormData, FormErrors, TouchedFields } from '../types';
import FormInput from './FormInput';
import styles from '../styles';

const LoginForm: React.FC<LoginFormProps> = ({
  inputsOpacity,
  inputsTranslateY,
  onLogin,
  onForgotPassword,
  onCreateAccount,
  buttonOpacity,
  buttonScale,
  socialButtonsOpacity,
  socialButtonsTranslateY,
  footerOpacity,
}) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  // Estado para armazenar erros de validação
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para armazenar campos que foram tocados
  const [touched, setTouched] = useState<TouchedFields>({});

  // Estado para controlar a cor do botão de login
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Animações para botões
  const loginButtonAnimation = useRef(new Animated.Value(1)).current;
  
  // Função para animar o botão "Entrar"
  const pulseLoginButton = () => {
    Animated.sequence([
      Animated.timing(loginButtonAnimation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(loginButtonAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Atualizar um campo específico do formulário
  const updateField = (field: keyof LoginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar o campo em tempo real (apenas para email e senha)
    if (field === 'email' || field === 'password') {
      validateField(field, value);
    }
  };
  
  // Toggle para o checkbox "Manter-me conectado"
  const toggleRememberMe = () => {
    updateField('rememberMe', !formData.rememberMe);
  };
  
  // Marcar um campo como tocado quando o usuário sai do campo
  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };
  
  // Validar um campo específico
  const validateField = (field: 'email' | 'password', value: any) => {
    let newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'O email é obrigatório';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Digite um email válido (ex: nome@dominio.com)';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'A senha é obrigatória';
        } else if (value.length < 6) {
          newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;
    }
    
    setErrors(newErrors);
  };
  
  // Recalcular a validade do formulário quando os campos são alterados
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = formData.email && emailRegex.test(formData.email);
    const validPassword = formData.password && formData.password.length >= 6;
    
    setIsFormValid(Boolean(validEmail && validPassword));
  }, [formData.email, formData.password]);
  
  // Manipular o envio do formulário
  const handleLogin = () => {
    if (validateForm()) {
      pulseLoginButton(); // Animar o botão "Entrar"
      onLogin(formData.email, formData.password);
    }
  };
  
  // Validar o formulário completo
  const validateForm = () => {
    // Validar email
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    // Verificar se há erros
    const hasErrors = Object.keys(errors).length > 0;
    
    // Garantir que os valores estejam preenchidos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = formData.email && emailRegex.test(formData.email);
    const validPassword = formData.password && formData.password.length >= 6;
    
    // Se não há erros e os campos estão preenchidos corretamente, o formulário é válido
    return !hasErrors && validEmail && validPassword;
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
            contentContainerStyle={{ paddingTop: 5, paddingBottom: 10 }}
            nestedScrollEnabled={true}
          >
            {/* Email */}
            <FormInput
              label="Email"
              placeholder="Digite seu email"
              opacity={inputsOpacity[0]}
              translateY={inputsTranslateY[0]}
              icon="mail-outline"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              error={errors.email}
              touched={touched.email}
              onBlur={() => handleBlur('email')}
            />
            
            {/* Senha */}
            <FormInput
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
              opacity={inputsOpacity[1]}
              translateY={inputsTranslateY[1]}
              icon="lock-closed-outline"
              value={formData.password}
              onChangeText={(text) => updateField('password', text)}
              error={errors.password}
              touched={touched.password}
              onBlur={() => handleBlur('password')}
            />
            
            {/* Manter-me conectado */}
            <Animated.View 
              style={[
                styles.rememberMeContainer,
                { 
                  opacity: inputsOpacity[1],
                  transform: [{ translateY: inputsTranslateY[1] }]
                }
              ]}
            >
              <TouchableOpacity 
                style={[
                  styles.checkbox,
                  formData.rememberMe && styles.checkboxSelected
                ]} 
                onPress={toggleRememberMe}
              >
                {formData.rememberMe && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleRememberMe}>
                <Text style={styles.checkboxText}>Manter-me conectado</Text>
              </TouchableOpacity>
            </Animated.View>
            
            {/* Esqueceu a senha */}
            <Animated.View 
              style={[
                styles.forgotPasswordContainer,
                { 
                  opacity: inputsOpacity[1],
                  transform: [{ translateY: inputsTranslateY[1] }]
                }
              ]}
            >
              <TouchableOpacity onPress={onForgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  <Ionicons name="lock-closed-outline" size={14} /> Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </LinearGradient>
      </View>
      
      {/* Botão de login */}
      <View style={styles.footer}>
        <Animated.View
          style={{
            width: '50%',
            opacity: buttonOpacity,
            transform: [
              { scale: buttonScale },
              { scale: loginButtonAnimation } // Adicionando animação de pulso
            ]
          }}
        >
          <TouchableOpacity
            style={[
              styles.loginButton,
              isFormValid && styles.validLoginButton
            ]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Divisor "ou" */}
        <Animated.View 
          style={[
            styles.dividerContainer,
            {
              opacity: socialButtonsOpacity,
              transform: [{ translateY: socialButtonsTranslateY }],
              marginBottom: 20  // Adicionando espaço após a linha
            }
          ]}
        >
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </Animated.View>
        
        {/* Criar conta - na mesma linha */}
        <Animated.View 
          style={[
            styles.createAccountContainer, 
            { opacity: footerOpacity }
          ]}
        >
          <Text style={styles.footerText}>Ainda não tem conta?</Text>
          <TouchableOpacity onPress={onCreateAccount}>
            <Text style={styles.createAccountText}>Criar conta</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

export default LoginForm; 