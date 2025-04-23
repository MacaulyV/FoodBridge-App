import { useState, useCallback } from 'react';
import { DonationFormData, FormErrors, TouchedFields } from '../types';

export const useDonationForm = () => {
  // Estado para os valores do formulário
  const [formData, setFormData] = useState<DonationFormData>({
    foodName: '',
    expirationDate: null,
    description: '',
    district: '',
    preferredPickupTime: '',
    images: [],
    termsAccepted: false,
  });
  
  // Estado para os erros do formulário
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Estado para rastrear quais campos foram tocados
  const [touched, setTouched] = useState<TouchedFields>({});
  
  // Atualizar um valor do formulário
  const updateFormField = (field: keyof DonationFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Validar o campo após atualização
    validateField(field, value);
  };
  
  // Marcar um campo como tocado
  const handleBlur = (field: keyof DonationFormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
    
    // Validar o campo quando perder o foco
    validateField(field, formData[field]);
  };
  
  // Validar um campo específico
  const validateField = (field: keyof DonationFormData, value: any) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'foodName':
        if (!value || value.trim() === '') {
          newErrors.foodName = 'Nome do alimento é obrigatório';
        } else {
          delete newErrors.foodName;
        }
        break;
        
      case 'expirationDate':
        if (!value) {
          newErrors.expirationDate = 'Data de validade é obrigatória';
        } else {
          // Verificar se a data é atual ou futura
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite
          
          const dateToCheck = new Date(value);
          dateToCheck.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite
          
          if (dateToCheck < today) {
            // Não adicionar mensagem de erro, apenas marcar o campo como inválido
            // setando a propriedade com string vazia
            newErrors.expirationDate = '';
          } else {
            delete newErrors.expirationDate;
          }
        }
        break;
        
      case 'district':
        if (!value || value.trim() === '') {
          newErrors.district = 'Bairro ou distrito é obrigatório';
        } else {
          delete newErrors.district;
        }
        break;
        
      case 'termsAccepted':
        if (!value) {
          newErrors.termsAccepted = 'Você precisa aceitar os termos';
        } else {
          delete newErrors.termsAccepted;
        }
        break;
        
      default:
        // Campos opcionais não precisam de validação
        break;
    }
    
    setErrors(newErrors);
  };
  
  // Validar o formulário inteiro
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    
    // Verificar campos obrigatórios
    if (!formData.foodName || formData.foodName.trim() === '') {
      newErrors.foodName = 'Nome do alimento é obrigatório';
    }
    
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Data de validade é obrigatória';
    } else {
      // Verificar se a data é atual ou futura
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite
      
      const dateToCheck = new Date(formData.expirationDate);
      dateToCheck.setHours(0, 0, 0, 0); // Resetar as horas para meia-noite
      
      if (dateToCheck < today) {
        // Não adicionar mensagem de erro, apenas marcar o campo como inválido
        newErrors.expirationDate = '';
      }
    }
    
    if (!formData.district || formData.district.trim() === '') {
      newErrors.district = 'Bairro ou distrito é obrigatório';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Você precisa aceitar os termos';
    }
    
    setErrors(newErrors);
    
    // Retornar true se não houver erros
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  
  return {
    formData,
    errors,
    touched,
    updateFormField,
    handleBlur,
    validateForm,
  };
}; 