import React, { useEffect } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { NavigationProps } from './types';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import ContentSection from './components/ContentSection';
import ProfileOptionsContainer from './components/ProfileOptionsContainer';
import IllustrationImage from './components/IllustrationImage';
import NavBar from './components/NavBar';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

/**
 * Tela de Escolha de Perfil com animações e navegação contextual
 */
const ChooseProfileScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
    animateProfileOptions,
    animateImage
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { handleBack, handleDonate, handleReceive } = useNavigation(animValues, navigation);
  
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
    animateProfileOptions();
    animateImage();
    
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
          {/* Título da seção */}
          <View style={styles.header}>
            <ContentSection
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Opções de perfil */}
          <View style={styles.mainContent}>
            <ProfileOptionsContainer
              containerOpacity={animValues.containerOpacity}
              containerTranslateY={animValues.containerTranslateY}
              donateOptionOpacity={animValues.donateOptionOpacity}
              donateOptionScale={animValues.donateOptionScale}
              receiveOptionOpacity={animValues.receiveOptionOpacity}
              receiveOptionScale={animValues.receiveOptionScale}
              onSelectDonate={handleDonate}
              onSelectReceive={handleReceive}
            />
          </View>
          
          {/* Imagem ilustrativa na parte inferior */}
          <View style={styles.footer}>
            <IllustrationImage
              imageOpacity={animValues.imageOpacity}
              imageScale={animValues.imageScale}
              imageTranslateY={animValues.imageTranslateY}
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar onBack={handleBack} />
    </View>
  );
};

export default ChooseProfileScreen; 