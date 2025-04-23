import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EditProfileModalProps, UserProfile } from '../types';
import { getUserData, UserData, updateUserAccount } from '../../../services/userService';

/**
 * Modal para edição de informações do perfil
 */
const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  userProfile,
  onProfileUpdated
}) => {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [profileType, setProfileType] = useState<'pessoa_fisica' | 'pessoa_juridica' | 'ong'>('pessoa_fisica');
  
  // Estados para validação e feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado para controlar se o formulário foi modificado
  const [formModified, setFormModified] = useState(false);

  // Carregar dados do usuário quando o modal for aberto
  useEffect(() => {
    if (isVisible) {
      loadUserData();
      // Limpar campo de senha sempre que o modal for aberto
      setPassword('');
      // Resetar estados
      setFormModified(false);
      setErrors({});
    }
  }, [isVisible]);

  // Função para carregar os dados do usuário do storage
  const loadUserData = async () => {
    setIsLoading(true);
    
    try {
      // Primeiro, carregar dados do AsyncStorage através do serviço
      const storedUserData = await getUserData();
      
      if (storedUserData) {
        // Se existirem dados salvos, usar eles para preencher o formulário
        setName(storedUserData.nome);
        setEmail(storedUserData.email);
        setCity(storedUserData.cidade);
        setNeighborhood(storedUserData.bairro_ou_distrito);
        setProfileType(mapProfileType(storedUserData.tipo));
      } else if (userProfile) {
        // Se não tiver dados salvos, usar os dados passados via props (fallback)
        setName(userProfile.name || '');
        setEmail(userProfile.email || '');
        setCity(userProfile.city || '');
        setNeighborhood(userProfile.neighborhood || '');
        setProfileType(userProfile.profileType || 'pessoa_fisica');
      }
    } catch (error) {
      console.error('❌ [EDIT_PROFILE] Erro ao carregar dados do usuário:', error);
      // Usar os dados das props como fallback em caso de erro
      if (userProfile) {
        setName(userProfile.name || '');
        setEmail(userProfile.email || '');
        setCity(userProfile.city || '');
        setNeighborhood(userProfile.neighborhood || '');
        setProfileType(userProfile.profileType || 'pessoa_fisica');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Funções para manipulação de campos com controle de modificação
  const handleNameChange = (value: string) => {
    setName(value);
    setFormModified(true);
    // Limpar erro se o campo foi preenchido
    if (value.trim()) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.name;
        return newErrors;
      });
    }
  };
  
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setFormModified(true);
    // Limpar erro se o campo foi preenchido
    if (value.trim()) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.email;
        return newErrors;
      });
    }
  };
  
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setFormModified(true);
    // Limpar erro se o campo foi preenchido
    if (value.trim()) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.password;
        return newErrors;
      });
    }
  };
  
  const handleCityChange = (value: string) => {
    setCity(value);
    setFormModified(true);
    // Limpar erro se o campo foi preenchido
    if (value.trim()) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.city;
        return newErrors;
      });
    }
  };
  
  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    setFormModified(true);
    // Limpar erro se o campo foi preenchido
    if (value.trim()) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.neighborhood;
        return newErrors;
      });
    }
  };
  
  // Mapear o tipo de perfil da API para o formato usado pelo app
  const mapProfileType = (tipo: string): 'pessoa_fisica' | 'pessoa_juridica' | 'ong' => {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower.includes('juridica') || tipoLower.includes('jurídica') || tipoLower.includes('empresa')) {
      return 'pessoa_juridica';
    } else if (tipoLower.includes('ong') || tipoLower.includes('organização')) {
      return 'ong';
    }
    return 'pessoa_fisica'; // Valor padrão
  };

  // Converter o tipo de perfil para o formato da API
  const getApiProfileType = (type: 'pessoa_fisica' | 'pessoa_juridica' | 'ong'): string => {
    switch (type) {
      case 'pessoa_fisica':
        return 'Pessoa Física';
      case 'pessoa_juridica':
        return 'Pessoa Jurídica';
      case 'ong':
        return 'ONG';
      default:
        return 'Pessoa Física';
    }
  };

  // Função para lidar com a seleção do tipo de perfil
  const handleProfileTypeSelection = (type: 'pessoa_fisica' | 'pessoa_juridica' | 'ong') => {
    setProfileType(type);
    setFormModified(true);
  };

  // Validar o formulário antes de enviar
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validar campos obrigatórios
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    
    if (!neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro ou distrito é obrigatório';
    }
    
    // Validar senha (agora um campo obrigatório para a API)
    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória para confirmar as alterações';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }
    
    // Atualizar estado de erros
    setErrors(newErrors);
    
    // Formulário é válido se não houver erros
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      // Verificar se o formulário foi modificado
      if (!formModified) {
        console.log('📝 [EDIT_PROFILE] Nenhuma modificação foi feita nos dados');
        onClose();
        return;
      }
      
      // Validar formulário
      if (!validateForm()) {
        console.log('❌ [EDIT_PROFILE] Formulário inválido:', errors);
        return; // Retorna sem mostrar o alerta, os erros serão exibidos nos campos
      }
      
      // Iniciar submissão
      setIsSubmitting(true);
      
      // Preparar dados para API
      const updateData = {
        nome: name,
        email: email,
        senha: password, // A senha é sempre obrigatória para a API
        cidade: city,
        bairro_ou_distrito: neighborhood,
        tipo: getApiProfileType(profileType)
      };
      
      console.log('🔄 [EDIT_PROFILE] Enviando dados para atualização:', updateData);
      
      // Chamar serviço para atualizar usuário
      const updatedUser = await updateUserAccount(updateData);
      
      console.log('✅ [EDIT_PROFILE] Usuário atualizado com sucesso:', updatedUser);
      
      // Transformar dados da API para o formato do componente
      const updatedProfile: UserProfile = {
        name: updatedUser.nome,
        email: updatedUser.email,
        city: updatedUser.cidade,
        neighborhood: updatedUser.bairro_ou_distrito,
        profileType: mapProfileType(updatedUser.tipo),
        avatar: updatedUser.avatar
      };
      
      // Chamar o callback se existir
      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }
      
      // Mostrar mensagem de sucesso
      Alert.alert(
        "Sucesso",
        "Seus dados foram atualizados com sucesso!",
        [{ text: "OK" }]
      );
      
      // Fechar modal após atualização bem-sucedida
      onClose();
    } catch (error: any) {
      console.error('❌ [EDIT_PROFILE] Erro ao atualizar dados:', error);
      
      // Verificar se o erro está relacionado à senha
      if (error.message && (
          error.message.toLowerCase().includes('senha') ||
          error.message.toLowerCase().includes('password')
      )) {
        // Erro relacionado à senha - mostrar erro no campo em vez de alerta
        setErrors(prev => ({
          ...prev,
          password: error.message || 'Erro na senha. Tente novamente.'
        }));
      } else {
        // Outros erros da API - mostrar alerta
        Alert.alert(
          "Erro na Atualização",
          error.message || "Não foi possível atualizar seus dados. Por favor, tente novamente mais tarde.",
          [{ text: "OK" }]
        );
      }
    } finally {
      // Finalizar submissão
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
          ) : (
            <ScrollView style={styles.formContainer}>
              {/* Nome */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nome Completo</Text>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  value={name}
                  onChangeText={handleNameChange}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Digite seu email"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Digite sua senha "
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  secureTextEntry={true}
                />
                {errors.password ? (
                  <Text style={[styles.errorText, styles.errorTextHighlight]}>{errors.password}</Text>
                ) : (
                  <Text style={styles.helperText}>Senha necessária para confirmar alterações. Digite a senha atual ou uma nova senha.</Text>
                )}
              </View>

              {/* Cidade */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Cidade</Text>
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  value={city}
                  onChangeText={handleCityChange}
                  placeholder="Digite sua cidade"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>

              {/* Bairro */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Bairro ou Distrito</Text>
                <TextInput
                  style={[styles.input, errors.neighborhood && styles.inputError]}
                  value={neighborhood}
                  onChangeText={handleNeighborhoodChange}
                  placeholder="Digite seu bairro ou distrito"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                />
                {errors.neighborhood && <Text style={styles.errorText}>{errors.neighborhood}</Text>}
              </View>

              {/* Tipo de Perfil */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tipo de Perfil</Text>
                <View style={styles.profileTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.profileTypeButton,
                      profileType === 'pessoa_fisica' && styles.selectedProfileType
                    ]}
                    onPress={() => handleProfileTypeSelection('pessoa_fisica')}
                  >
                    <Text style={[
                      styles.profileTypeText,
                      profileType === 'pessoa_fisica' && styles.selectedProfileTypeText
                    ]}>
                      Pessoa Física
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.profileTypeButton,
                      profileType === 'pessoa_juridica' && styles.selectedProfileType
                    ]}
                    onPress={() => handleProfileTypeSelection('pessoa_juridica')}
                  >
                    <Text style={[
                      styles.profileTypeText,
                      profileType === 'pessoa_juridica' && styles.selectedProfileTypeText
                    ]}>
                      Pessoa Jurídica
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.profileTypeButton,
                      profileType === 'ong' && styles.selectedProfileType
                    ]}
                    onPress={() => handleProfileTypeSelection('ong')}
                  >
                    <Text style={[
                      styles.profileTypeText,
                      profileType === 'ong' && styles.selectedProfileTypeText
                    ]}>
                      ONG
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isLoading || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#191919',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputError: {
    borderColor: '#E74C3C',
    borderWidth: 1,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
  },
  errorTextHighlight: {
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 3,
  },
  helperText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  profileTypeContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  profileTypeButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedProfileType: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: '#4CAF50',
  },
  profileTypeText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedProfileTypeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#333333',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.5)',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 200,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});

export default EditProfileModal; 