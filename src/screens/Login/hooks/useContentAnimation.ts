import { Animated } from 'react-native';

export const useContentAnimation = (animValues: any) => {
  // Animar a entrada da tela
  const animateScreenEntry = () => {
    Animated.parallel([
      // Fade in da tela
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      // Deslizar da direita
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar o fundo
  const animateBackground = () => {
    Animated.parallel([
      // Fade in do gradiente
      Animated.timing(animValues.gradientOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      // Intensificar o desfoque
      Animated.timing(animValues.blurIntensity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar o título
  const animateTitle = () => {
    Animated.parallel([
      // Fade in do título
      Animated.timing(animValues.titleOpacity, {
        toValue: 1,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
      // Subir o título
      Animated.timing(animValues.titleTranslateY, {
        toValue: 0,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar os campos do formulário de forma sequencial
  const animateFormInputs = () => {
    // Determinar o número de campos de entrada
    const animationSequence: Animated.CompositeAnimation[] = [];
    
    // Para cada campo de entrada, criar uma animação sequencial
    animValues.inputsOpacity.forEach((opacity: Animated.Value, index: number) => {
      const delay = 350 + (index * 100); // Delay maior entre os itens para ser mais imersivo
      
      animationSequence.push(
        Animated.parallel([
          // Fade in do campo
          Animated.timing(opacity, {
            toValue: 1,
            duration: 450,
            delay,
            useNativeDriver: true,
          }),
          // Subir o campo
          Animated.timing(animValues.inputsTranslateY[index], {
            toValue: 0,
            duration: 450,
            delay,
            useNativeDriver: true,
          }),
        ])
      );
    });
    
    // Iniciar a sequência de animações com um tempo maior entre elas
    Animated.stagger(80, animationSequence).start();
  };
  
  // Animar o botão de login
  const animateButton = () => {
    // Atraso maior para o botão aparecer
    const buttonDelay = 400 + (animValues.inputsOpacity.length * 100) + 100;
    
    Animated.parallel([
      // Fade in do botão
      Animated.timing(animValues.buttonOpacity, {
        toValue: 1,
        duration: 500,
        delay: buttonDelay,
        useNativeDriver: true,
      }),
      // Aumentar a escala
      Animated.timing(animValues.buttonScale, {
        toValue: 1,
        duration: 500,
        delay: buttonDelay,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Iniciar animação de pulsação após o botão aparecer
      Animated.loop(
        Animated.sequence([
          Animated.timing(animValues.buttonPulse, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(animValues.buttonPulse, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };
  
  // Animar os botões sociais
  const animateSocialButtons = () => {
    // Atraso maior para os botões sociais aparecerem depois do botão principal
    const socialDelay = 500 + (animValues.inputsOpacity.length * 100) + 200;
    
    Animated.parallel([
      // Fade in dos botões sociais
      Animated.timing(animValues.socialButtonsOpacity, {
        toValue: 1,
        duration: 500,
        delay: socialDelay,
        useNativeDriver: true,
      }),
      // Subir os botões sociais
      Animated.timing(animValues.socialButtonsTranslateY, {
        toValue: 0,
        duration: 500,
        delay: socialDelay,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Animar o footer
  const animateFooter = () => {
    // Atraso para o footer aparecer depois de tudo
    const footerDelay = 600 + (animValues.inputsOpacity.length * 100) + 300;
    
    Animated.timing(animValues.footerOpacity, {
      toValue: 1,
      duration: 500,
      delay: footerDelay,
      useNativeDriver: true,
    }).start();
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateFormInputs,
    animateButton,
    animateSocialButtons,
    animateFooter,
  };
}; 