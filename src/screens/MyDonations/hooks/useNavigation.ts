import { useCallback } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../@types/navigation';

/**
 * Hook para gerenciar a navegação da tela MyDonations
 */
export const useNavigation = (
  animValues: any,
  navigation: NavigationProp<RootStackParamList>
) => {
  // Animar botão ao pressionar
  const animateButtonPress = (scale: any) => {
    scale.setValue(0.9);
    setTimeout(() => {
      scale.setValue(1);
    }, 150);
  };

  // Voltar para a tela anterior com animação
  const handleBack = useCallback(() => {
    // Animar o botão de voltar
    animateButtonPress(animValues.backButtonScale);
    
    // Executar animação de saída e então navegar de volta
    setTimeout(() => {
      navigation.goBack();
    }, 150);
  }, [navigation, animValues.backButtonScale]);

  // Navegar para a tela de criação de doação
  const handleCreateDonation = useCallback(() => {
    navigation.navigate('DonateFood');
  }, [navigation]);

  return {
    handleBack,
    handleCreateDonation,
    animateButtonPress
  };
}; 