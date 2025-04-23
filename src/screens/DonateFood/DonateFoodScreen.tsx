import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet, Animated } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

// Componentes
import NavBar from './components/NavBar';
import BottomNavBar from './components/BottomNavBar';
import DonateFoodForm from './components/DonateFoodForm';
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import DonateFoodTitle from './components/DonateFoodTitle';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useDonationSubmit } from './hooks/useDonationSubmit';

type Props = StackScreenProps<RootStackParamList, 'DonateFood'>;

/**
 * Tela de Doação de Alimentos do aplicativo FoodBridge
 */
const DonateFoodScreen: React.FC<Props> = ({ navigation }) => {
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
    animateNavBar
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar doações e navegação
  const { 
    isLoading, 
    error, 
    handleBack, 
    submitDonation 
  } = useDonationSubmit(animValues, navigation);
  
  // Iniciar todas as animações quando o componente for montado
  useEffect(() => {
    // Inicializar e animar a tela em ordem
    const initAnimations = async () => {
      // Animar a entrada da tela
      animateScreenEntry();
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
      
      // Animar navbar
      animateNavBar();
      
      // Animar cada partícula
      [...backgroundParticles, ...middleParticles, ...foregroundParticles]
        .forEach(animateParticle);
    };
    
    initAnimations();
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.animatedContainer,
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
            <DonateFoodTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Formulário de doação */}
          <View style={styles.mainContent}>
            <DonateFoodForm
              inputsOpacity={animValues.inputsOpacity}
              inputsTranslateY={animValues.inputsTranslateY}
              onDonate={(formData) => submitDonation(formData)}
              buttonOpacity={animValues.buttonOpacity}
              buttonScale={animValues.buttonScale}
              isLoading={isLoading}
            />
          </View>
        </View>
        
        {/* Barra de navegação inferior */}
        <BottomNavBar
          navBarOpacity={animValues.navBarOpacity}
          navigation={navigation}
        />
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar onBack={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  animatedContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 120,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContent: {
    width: '100%',
    flex: 1,
  },
});

export default DonateFoodScreen;