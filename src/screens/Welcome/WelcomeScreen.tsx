import React, { useEffect, useRef } from 'react';
import { View, Animated, StatusBar } from 'react-native';
import { NavigationProps } from './types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import AnimatedLogo from './components/AnimatedLogo';
import WelcomeTitle from './components/WelcomeTitle';
import NavigationControls from './components/NavigationControls';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useLogoAnimation } from './hooks/useLogoAnimation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

// Tipo com as props corretas para o componente
type Props = StackScreenProps<RootStackParamList, 'Welcome'>;

/**
 * Tela de boas-vindas com animações ricas
 */
const WelcomeScreen: React.FC<Props> = ({ navigation, route }) => {
  // Verificar se estamos retornando para a tela
  const isReturning = route?.params?.isReturning || false;
  const fromDirection = route?.params?.fromDirection || 'right';
  const skipAnimation = route?.params?.skipAnimation ?? true;
  
  // Inicializar todos os valores de animação
  const animValues = useAnimationValues();
  
  // Hooks para gerenciar partículas
  const { 
    backgroundParticles, 
    middleParticles, 
    foregroundParticles, 
    animateParticle, 
    animateParallaxLayers,
    setFinalParticleValues
  } = useParticleAnimation();
  
  // Hooks para gerenciar animações do logo e fundo
  const { 
    animateGradient, 
    animateCircleGlow, 
    animateBorderProgress, 
    animateLogo, 
    animateBackground,
    setFinalLogoValues
  } = useLogoAnimation(animValues);
  
  // Hook para gerenciar animações de texto
  const { 
    animateTexts,
    setFinalTextValues
  } = useTextAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { handleNext } = useNavigation(animValues, navigation);
  
  // Referência para controlar se é a primeira renderização
  const isFirstRender = useRef(true);
  
  // Função para definir valores finais das animações sem animá-los
  const setFinalAnimationValues = () => {
    // Definir valores de opacidade e posição da tela
    animValues.screenOpacity.setValue(1);
    animValues.screenSlide.setValue(0);
    
    // Definir valores finais do fundo
    animValues.gradientOpacity.setValue(1);
    animValues.blurIntensity.setValue(1);
    
    // Definir valores finais das partículas
    setFinalParticleValues();
    
    // Definir valores finais do logo
    setFinalLogoValues();
    
    // Definir valores finais dos textos
    setFinalTextValues();
    
    // Definir valores finais dos controles de navegação
    animValues.buttonOpacity.setValue(1);
    animValues.buttonScale.setValue(1);
    animValues.buttonTranslateY.setValue(0);
    animValues.pageIndicatorsOpacity.setValue(1);
    
    // Iniciar apenas as animações sutis contínuas
    animateParallaxLayers(
      animValues.backgroundParallax,
      animValues.middleLayerParallax,
      animValues.foregroundParallax
    );
    
    // Animar partículas
    [...backgroundParticles, ...middleParticles, ...foregroundParticles]
      .forEach(animateParticle);
  };
  
  // Função para animar a entrada da tela quando voltando
  const animateEntryFromLeft = () => {
    // Posicionar inicialmente fora da tela à esquerda e invisível
    animValues.screenOpacity.setValue(0);
    animValues.screenSlide.setValue(-300); // Valor negativo para posicionar à esquerda
    
    // Definir valores finais para todos os elementos
    setFinalLogoValues();
    setFinalParticleValues();
    setFinalTextValues();
    
    // Animar a entrada com fade in e deslize da esquerda para o centro
    Animated.parallel([
      Animated.timing(animValues.screenOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animValues.screenSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    
    // Iniciar animações contínuas
    animateGradient();
    animateCircleGlow();
    
    // Iniciar animações de partículas
    animateParallaxLayers(
      animValues.backgroundParallax,
      animValues.middleLayerParallax,
      animValues.foregroundParallax
    );
    
    // Animar partículas
    [...backgroundParticles, ...middleParticles, ...foregroundParticles]
      .forEach(animateParticle);
  };
  
  // Configurar valores antes da primeira renderização
  if (isFirstRender.current) {
    if (isReturning) {
      if (skipAnimation) {
        // Se estamos retornando e queremos pular a animação
        setFinalAnimationValues();
      } else if (fromDirection === 'left') {
        // Se estamos voltando da tela HowItWorks com animação
        // Preparar para a animação de entrada da esquerda
        // (será executada no useEffect)
      }
    }
    isFirstRender.current = false;
  }
  
  // Iniciar todas as animações quando o componente for montado
  useEffect(() => {
    if (!isReturning) {
      // Se não estamos retornando, executar as animações normais de entrada
      // Animar fundo
      animateBackground();
      
      // Animar logo
      animateBorderProgress();
      animateLogo();
      
      // Animar gradientes e efeitos visuais
      animateGradient();
      animateCircleGlow();
      
      // Animar efeito parallax
      animateParallaxLayers(
        animValues.backgroundParallax,
        animValues.middleLayerParallax,
        animValues.foregroundParallax
      );
      
      // Animar textos
      animateTexts();
      
      // Animar cada partícula
      [...backgroundParticles, ...middleParticles, ...foregroundParticles]
        .forEach(animateParticle);
    } else if (isReturning && !skipAnimation && fromDirection === 'left') {
      // Se estamos retornando da tela HowItWorks com uma animação
      animateEntryFromLeft();
    } else {
      // Se estamos retornando com skipAnimation, apenas garantir que 
      // as animações contínuas estejam rodando
      animateGradient();
      animateCircleGlow();
    }
  }, []);
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          opacity: animValues.screenOpacity,
          transform: [{ translateX: animValues.screenSlide }] 
        }
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      {/* Fundo com gradiente */}
      <GradientBackground 
        gradientOpacity={animValues.gradientOpacity} 
        blurIntensity={animValues.blurIntensity} 
      />
      
      {/* Sistema de partículas */}
      <ParticleSystem
        backgroundParticles={backgroundParticles}
        middleParticles={middleParticles}
        foregroundParticles={foregroundParticles}
      />
      
      {/* Container principal */}
      <View style={styles.contentContainer}>
        {/* Logo animado com borda progressiva */}
        <AnimatedLogo
          logoOpacity={animValues.logoOpacity}
          mainScale={animValues.mainScale}
          logoRotate={animValues.logoRotate}
          borderProgress={animValues.borderProgress}
          circleGlow={animValues.circleGlow}
        />
        
        {/* Título e subtítulo */}
        <WelcomeTitle
          titleOpacity={animValues.titleOpacity}
          titleTranslateY={animValues.titleTranslateY}
          subtitleOpacity={animValues.subtitleOpacity}
          subtitleTranslateY={animValues.subtitleTranslateY}
        />
        
        {/* Controles de navegação */}
        <NavigationControls
          buttonOpacity={animValues.buttonOpacity}
          buttonTranslateY={animValues.buttonTranslateY}
          buttonScale={animValues.buttonScale}
          buttonPulse={animValues.buttonPulse}
          pageIndicatorsOpacity={animValues.pageIndicatorsOpacity}
          onNext={handleNext}
        />
      </View>
    </Animated.View>
  );
};

export default WelcomeScreen; 