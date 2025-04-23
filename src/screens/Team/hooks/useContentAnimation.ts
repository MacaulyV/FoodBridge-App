import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import { TeamMember } from '../types';

// Ativar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Easings personalizados para animações mais orgânicas
const springEasing = Easing.bezier(0.43, 0.28, 0.23, 0.99);
const cinematic = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const popEasing = Easing.bezier(0.34, 1.56, 0.64, 1);

/**
 * Hook para gerenciar as animações do conteúdo da tela com interações avançadas
 */
export const useContentAnimation = (animValues: any) => {
  // Animar o gradiente e outros elementos de fundo com efeito parallax
  const animateBackground = () => {
    Animated.timing(animValues.gradientOpacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing: cinematic,
    }).start();
    
    Animated.timing(animValues.blurIntensity, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
      easing: cinematic,
    }).start();
  };
  
  // Animar a entrada da tela inteira com transição cinematográfica
  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: cinematic,
      }),
      
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
        easing: springEasing,
      })
    ]).start();
  };
  
  // Animar o título com movimento orgânico
  const animateTitle = () => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(animValues.titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.titleTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o container principal com movimento natural
  const animateContainer = () => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(animValues.containerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.containerTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Inicializar e animar os cards dos membros do time com efeitos imersivos
  const initializeAndAnimateTeamCards = (teamMembers: TeamMember[]) => {
    // Configurar uma animação de layout para transições suaves
    LayoutAnimation.configureNext({
      duration: 500,
      create: { 
        type: LayoutAnimation.Types.spring, 
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.7,
      },
      update: { 
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
    
    // Limpar arrays anteriores para evitar problemas
    animValues.teamMemberCards.cardOpacity = [];
    animValues.teamMemberCards.cardScale = [];
    animValues.teamMemberCards.cardTranslateY = [];
    
    // Inicializar valores de animação para cada card
    teamMembers.forEach((_, index) => {
      animValues.teamMemberCards.cardOpacity[index] = new Animated.Value(0);
      animValues.teamMemberCards.cardScale[index] = new Animated.Value(0.92);
      animValues.teamMemberCards.cardTranslateY[index] = new Animated.Value(60);
    });
    
    // Pequeno delay para garantir que os valores sejam inicializados corretamente
    setTimeout(() => {
      // Animar cada card com delay sequencial e movimento orgânico
      teamMembers.forEach((_, index) => {
        Animated.sequence([
          Animated.delay(400 + index * 180), // Delay crescente para cada card com ritmo cinematográfico
          Animated.parallel([
            Animated.timing(animValues.teamMemberCards.cardOpacity[index], {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
              easing: cinematic,
            }),
            Animated.spring(animValues.teamMemberCards.cardScale[index], {
              toValue: 1,
              friction: 8,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.spring(animValues.teamMemberCards.cardTranslateY[index], {
              toValue: 0,
              friction: 7,
              tension: 40,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    }, 100);
  };
  
  // Animar o footer com movimento fluido
  const animateFooter = () => {
    Animated.sequence([
      Animated.delay(900),
      Animated.parallel([
        Animated.timing(animValues.footerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: cinematic,
        }),
        Animated.spring(animValues.footerTranslateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };
  
  // Animar o navbar inferior com aparição suave
  const animateNavBar = () => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.spring(animValues.navBarOpacity, {
        toValue: 1,
        friction: 10,
        tension: 20,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  return {
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateContainer,
    initializeAndAnimateTeamCards,
    animateFooter,
    animateNavBar,
  };
}; 