import { Animated, Easing } from 'react-native';

/**
 * Hook para gerenciar a navegação da tela
 */
export const useNavigation = (animValues: any, navigation: any) => {
  // Função para voltar à tela anterior com animação de saída
  const handleBack = () => {
    // Animação de saída para a esquerda
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 1, 1),
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1),
      }),
    ]).start(() => {
      // Navegar para a tela anterior após a animação
      navigation.goBack();
    });
  };
  
  // Função para navegar para a tela do Menu
  const handleMenu = () => {
    // Implementar navegação quando o Menu estiver disponível
    console.log('Navegar para Menu - a ser implementado');
  };
  
  // Função para navegar para a tela de Perfil
  const handleProfile = () => {
    // Implementar navegação quando o Perfil estiver disponível
    console.log('Navegar para Perfil - a ser implementado');
  };
  
  // Função para navegar para a tela de Doações
  const handleDonations = () => {
    // Implementar navegação quando Doações estiver disponível
    console.log('Navegar para Doações - a ser implementado');
  };
  
  // Função para navegar para a tela de Time (atual)
  const handleTeam = () => {
    // Já estamos na tela de Time, então não faz nada
    console.log('Já estamos na tela de Time');
  };
  
  return {
    handleBack,
    handleMenu,
    handleProfile,
    handleDonations,
    handleTeam,
  };
}; 