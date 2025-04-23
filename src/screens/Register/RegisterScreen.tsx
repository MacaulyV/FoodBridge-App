import React, { useEffect } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { NavigationProps, UserType } from './types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import RegisterTitle from './components/RegisterTitle';
import RegisterForm from './components/RegisterForm';
import NavBar from './components/NavBar';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useRegistrationLogic } from './hooks/useNavigation';

// Estilos
import styles from './styles';

// Tipo com as props corretas para o componente
type Props = StackScreenProps<RootStackParamList, 'Register'>;

/**
 * Tela de Cadastro com formulário dinâmico e animações ricas
 */
const RegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  // Extrair o tipo de usuário (doador ou receptor) dos parâmetros da rota
  const userType: UserType = route.params.userType;
  
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
    animateButton
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação e registro
  const { handleBack, submitRegistration, isLoading } = useRegistrationLogic(animValues, navigation);
  
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
        <View style={[styles.contentContainer, { paddingBottom: 100 }]}>
          {/* Título da tela */}
          <View style={styles.header}>
            <RegisterTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Formulário de cadastro */}
          <View style={styles.mainContent}>
            <RegisterForm
              userType={userType}
              inputsOpacity={animValues.inputsOpacity}
              inputsTranslateY={animValues.inputsTranslateY}
              onRegister={(formData) => submitRegistration(formData, userType)}
              buttonOpacity={animValues.buttonOpacity}
              buttonScale={animValues.buttonScale}
              isLoading={isLoading}
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar onBack={handleBack} />
    </View>
  );
};

export default RegisterScreen; 