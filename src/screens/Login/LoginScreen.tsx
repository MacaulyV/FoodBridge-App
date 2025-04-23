import React, { useEffect } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { NavigationProps } from './types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import LoginTitle from './components/LoginTitle';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

// Tipo com as props corretas para o componente
type Props = StackScreenProps<RootStackParamList, 'Login'>;

/**
 * Tela de Login com formulário dinâmico e animações ricas
 */
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Inicializar todos os valores de animação
  const animValues = useAnimationValues();
  
  // Hooks para gerenciar partículas
  const { 
    backgroundParticles, 
    middleParticles, 
    foregroundParticles, 
    animateParticle, 
    animateParallaxLayers 
  } = useParticleAnimation();
  
  // Hooks para gerenciar animações de conteúdo
  const { 
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateFormInputs,
    animateButton,
    animateSocialButtons,
    animateFooter
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { 
    handleBack, 
    handleLogin, 
    handleForgotPassword, 
    handleCreateAccount
  } = useNavigation(animValues, navigation);
  
  // Iniciar todas as animações quando o componente for montado
  useEffect(() => {
    // Animar entrada da tela
    animateScreenEntry();
    
    // Animar fundo
    animateBackground();
    
    // Animar efeito parallax
    animateParallaxLayers(
      animValues.backgroundParallax,
      animValues.middleLayerParallax,
      animValues.foregroundParallax
    );
    
    // Animar conteúdo
    animateTitle();
    animateFormInputs();
    animateButton();
    animateSocialButtons();
    animateFooter();
    
    // Animar cada partícula
    [...backgroundParticles, ...middleParticles, ...foregroundParticles]
      .forEach(animateParticle);
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
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
          {/* Título da tela */}
          <View style={styles.header}>
            <LoginTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Formulário de login */}
          <View style={[styles.mainContent, { paddingTop: 0 }]}>
            <LoginForm
              inputsOpacity={animValues.inputsOpacity}
              inputsTranslateY={animValues.inputsTranslateY}
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onCreateAccount={handleCreateAccount}
              buttonOpacity={animValues.buttonOpacity}
              buttonScale={animValues.buttonScale}
              socialButtonsOpacity={animValues.socialButtonsOpacity}
              socialButtonsTranslateY={animValues.socialButtonsTranslateY}
              footerOpacity={animValues.footerOpacity}
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar onBack={handleBack} />
    </View>
  );
};

export default LoginScreen; 