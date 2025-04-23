import React, { useEffect } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { NavigationProps } from './types';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import IllustrationImage from './components/IllustrationImage';
import ContentSection from './components/ContentSection';
import NavigationControls from './components/NavigationControls';
import NavBar from './components/NavBar';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

/**
 * Tela de "Como Funciona" com animações e visualização rica
 */
const HowItWorksScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
    animateBackground,
    animateScreenEntry,
    animateImage,
    animateTexts,
    animateControls
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { handleNext, handleBack } = useNavigation(animValues, navigation);
  
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
    animateImage();
    animateTexts();
    animateControls();
    
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
          {/* Imagem ilustrativa */}
          <View style={styles.header}>
            <IllustrationImage
              imageOpacity={animValues.imageOpacity}
              imageScale={animValues.imageScale}
              imageTranslateY={animValues.imageTranslateY}
            />
          </View>
          
          {/* Conteúdo principal */}
          <View style={styles.mainContent}>
            <ContentSection
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
              descriptionOpacity={animValues.descriptionOpacity}
              descriptionTranslateY={animValues.descriptionTranslateY}
            />
          </View>
          
          {/* Controles de navegação */}
          <View style={styles.footer}>
            <NavigationControls
              buttonOpacity={animValues.buttonOpacity}
              buttonScale={animValues.buttonScale}
              buttonPulse={animValues.buttonPulse}
              indicatorsOpacity={animValues.indicatorsOpacity}
              onNext={handleNext}
              currentScreen={1} // Segunda tela (índice 1)
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Nova NavBar com gradiente - colocada por último para garantir que fique no topo */}
      <NavBar onBack={handleBack} />
    </View>
  );
};

export default HowItWorksScreen; 