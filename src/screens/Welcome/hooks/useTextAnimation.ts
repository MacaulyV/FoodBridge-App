import { Animated } from 'react-native';
import { customEasings } from '../../../utils/animations';

interface TextAnimationValues {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
  subtitleOpacity: Animated.Value;
  subtitleTranslateY: Animated.Value;
  buttonOpacity: Animated.Value;
  buttonTranslateY: Animated.Value;
  pageIndicatorsOpacity: Animated.Value;
}

/**
 * Hook para gerenciar as animações relacionadas ao texto e botões
 */
export const useTextAnimation = (animValues: TextAnimationValues) => {
  // Animação para o título e subtítulo
  const animateTexts = () => {
    // Animar título apenas após 4 segundos (após animações iniciais terminarem)
    Animated.sequence([
      Animated.delay(4000), 
      Animated.parallel([
        Animated.timing(animValues.titleOpacity, {
          toValue: 1,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        }),
        Animated.timing(animValues.titleTranslateY, {
          toValue: 0,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        })
      ])
    ]).start();

    // Animar subtítulo logo após o título
    Animated.sequence([
      Animated.delay(4500), // 4s + 500ms após o início da animação do título
      Animated.parallel([
        Animated.timing(animValues.subtitleOpacity, {
          toValue: 1,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        }),
        Animated.timing(animValues.subtitleTranslateY, {
          toValue: 0,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        })
      ])
    ]).start();
    
    // Animar botão e indicadores após o subtítulo
    Animated.sequence([
      Animated.delay(5000), // 4s + 1000ms após o início da animação
      Animated.parallel([
        Animated.timing(animValues.buttonOpacity, {
          toValue: 1,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        }),
        Animated.timing(animValues.buttonTranslateY, {
          toValue: 0,
          duration: 800,
          easing: customEasings.gentleBounce,
          useNativeDriver: true
        }),
        Animated.timing(animValues.pageIndicatorsOpacity, {
          toValue: 1,
          duration: 800,
          easing: customEasings.softInOut,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  // Função para definir valores finais do texto sem animação
  const setFinalTextValues = () => {
    // Definir valores finais do título
    animValues.titleOpacity.setValue(1);
    animValues.titleTranslateY.setValue(0);
    
    // Definir valores finais do subtítulo
    animValues.subtitleOpacity.setValue(1);
    animValues.subtitleTranslateY.setValue(0);
    
    // Definir valores finais do botão e indicadores
    animValues.buttonOpacity.setValue(1);
    animValues.buttonTranslateY.setValue(0);
    animValues.pageIndicatorsOpacity.setValue(1);
  };

  return {
    animateTexts,
    setFinalTextValues
  };
}; 