import React, { useEffect } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import { NavigationProps } from './types';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import NavBar from './components/NavBar';
import MyRequestsTitle from './components/MyRequestsTitle';
import RequestsGrid from './components/RequestsGrid';
import RequestDetailsModal from './components/RequestDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import GlobalFooter from '../../components/Footer/Footer';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';
import { useRequests } from './hooks/useRequests';

// Estilos
import styles from './styles';

/**
 * Tela de Histórico de Solicitações do aplicativo FoodBridge
 */
const MyRequestsScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
    animateGrid,
    animateCards,
    animateNavBar
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { 
    handleBack
  } = useNavigation(animValues, navigation);
  
  // Hook para gerenciar solicitações
  const {
    requests,
    isLoading,
    selectedRequest,
    isDetailsModalVisible,
    isDeleteModalVisible,
    loadRequests,
    handleViewDetails,
    handleCloseDetails,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleConfirmDelete
  } = useRequests();

  // Carregar solicitações quando o componente for montado
  useEffect(() => {
    loadRequests();
  }, []);
  
  // Iniciar todas as animações quando o componente for montado
  useEffect(() => {
    // Inicializar e animar a tela em ordem
    const initAnimations = async () => {
      // Primeiro, animar a entrada da tela e o fundo
      animateScreenEntry();
      
      // Pequeno delay antes de animar o fundo
      setTimeout(() => {
        animateBackground();
        
        // Animar efeito parallax com partículas
        animateParallaxLayers(
          animValues.backgroundParallax,
          animValues.middleLayerParallax,
          animValues.foregroundParallax
        );
      }, 150);
      
      // NavBar aparece logo no início
      animateNavBar();
      
      // Título aparece após a entrada da tela
      // (o delay já está incluído na função de animação do título)
      animateTitle();
      
      // Grid e cards são animados com delay progressivo
      // (os delays já estão incluídos nas funções de animação)
      animateGrid();
      animateCards();
      
      // Animar cada partícula com delays aleatórios para maior naturalidade
      [...backgroundParticles, ...middleParticles, ...foregroundParticles].forEach((particle, index) => {
        setTimeout(() => {
          animateParticle(particle);
        }, Math.random() * 2000); // Delays aleatórios até 2 segundos
      });
    };
    
    initAnimations();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      {/* NavBar no topo da tela (fora do container animado) */}
      <NavBar 
        onBack={handleBack}
        navBarOpacity={animValues.navBarOpacity}
        navBarBackButtonScale={animValues.navBarBackButtonScale}
      />
      
      <Animated.View 
        style={[
          styles.animatedContainer,
          { 
            opacity: animValues.screenOpacity,
            transform: [{ translateX: animValues.screenSlide }] 
          }
        ]}
      >
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
            <MyRequestsTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
              subtitleOpacity={animValues.subtitleOpacity}
              subtitleTranslateY={animValues.subtitleTranslateY}
            />
          </View>
          
          {/* Grade de solicitações */}
          <View style={styles.mainContent}>
            <RequestsGrid
              requests={requests}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
              gridOpacity={animValues.gridOpacity}
              gridTranslateY={animValues.gridTranslateY}
              cardOpacity={animValues.cardOpacity}
              cardScale={animValues.cardScale}
            />
          </View>
        </View>
        
        {/* Modais */}
        <RequestDetailsModal
          isVisible={isDetailsModalVisible}
          request={selectedRequest}
          onClose={handleCloseDetails}
          onRemove={handleDeleteConfirmation}
        />
        
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          request={selectedRequest}
          onClose={handleCancelDelete}
          onConfirmDelete={handleConfirmDelete}
        />
      </Animated.View>
      
      {/* Footer global */}
      <GlobalFooter 
        activeScreen="menu" 
        navigation={navigation}
        opacity={animValues.navBarOpacity}
      />
    </View>
  );
};

export default MyRequestsScreen; 