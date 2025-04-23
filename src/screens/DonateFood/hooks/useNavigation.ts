import { Animated } from 'react-native';
import { Alert } from 'react-native';

export const useNavigation = (animValues: any, navigation: any) => {
  // Função para animar a saída da tela
  const animateScreenExit = (callback: () => void) => {
    Animated.parallel([
      // Fade out da tela
      Animated.timing(animValues.screenOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      // Deslizar para a direita
      Animated.timing(animValues.screenSlide, {
        toValue: 300,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };
  
  // Função para lidar com o retorno
  const handleBack = () => {
    animateScreenExit(() => {
      navigation.goBack();
    });
  };
  
  // Função para lidar com a submissão da doação
  const handleDonate = () => {
    // Animação de pressionar botão
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
      // Exibir alerta de successo
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
  };
  
  return {
    handleBack,
    handleDonate,
  };
}; 