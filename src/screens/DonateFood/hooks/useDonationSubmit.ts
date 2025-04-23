import { useState } from 'react';
import { Alert } from 'react-native';
import { DonationFormData } from '../types';
import { createDonation } from '../../../services/donationService';

export const useDonationSubmit = (
  animValues: any,
  navigation: any
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para animar a saída da tela
  const animateScreenExit = (callback: () => void) => {
    const { screenOpacity, screenSlide } = animValues;
    
    // Usando a API Animated para criar animações
    const Animated = require('react-native').Animated;
    
    Animated.parallel([
      // Fade out da tela
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      // Deslizar para a direita
      Animated.timing(screenSlide, {
        toValue: 300,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  // Função para lidar com o botão de voltar
  const handleBack = () => {
    animateScreenExit(() => {
      navigation.goBack();
    });
  };

  // Função para lidar com a submissão da doação
  const submitDonation = async (formData: DonationFormData) => {
    setIsLoading(true);
    setError(null);
    
    const Animated = require('react-native').Animated;

    try {
      // Fazer a chamada para o serviço de criação de doação
      await createDonation({
        foodName: formData.foodName,
        expirationDate: formData.expirationDate,
        description: formData.description,
        district: formData.district,
        preferredPickupTime: formData.preferredPickupTime,
        termsAccepted: formData.termsAccepted,
        images: formData.images
      });
      
      // Animar o botão ao ser pressionado
      Animated.sequence([
        Animated.timing(animValues.buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animValues.buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Exibir alerta de sucesso
        Alert.alert(
          "Doação Publicada!",
          "Sua doação foi publicada com sucesso e já está disponível para os receptores.",
          [
            { 
              text: "OK", 
              onPress: () => {
                // Animar a saída e voltar para a tela anterior
                animateScreenExit(() => {
                  navigation.goBack();
                });
              }
            }
          ]
        );
      });
    } catch (err: any) {
      console.error('❌ [DOAÇÃO] Erro ao criar doação:', err);
      
      // Extrair a mensagem de erro apropriada
      let errorMessage = 'Não foi possível completar a doação. Tente novamente.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      
      // Exibir alerta de erro
      Alert.alert(
        'Erro na doação',
        errorMessage,
        [{ text: 'OK' }]
      );
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleBack,
    submitDonation
  };
}; 