import React, { useEffect } from 'react';
import { View, StatusBar, Animated, TouchableOpacity } from 'react-native';
import { NavigationProps } from './types';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import NavBar from './components/NavBar';
import MyDonationsTitle from './components/MyDonationsTitle';
import DonationsGrid from './components/DonationsGrid';
import DonationDetailsModal from './components/DonationDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import EditDonationModal from './components/EditDonationModal';
import { Ionicons } from '@expo/vector-icons';
import GlobalFooter from '../../components/Footer/Footer';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';
import { useDonations } from './hooks/useDonations';

// Estilos
import styles from './styles';

/**
 * Tela de Minhas Doações do aplicativo FoodBridge
 */
const MyDonationsScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
    animateNavBar,
    animateButtonPress
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { 
    handleBack,
    handleCreateDonation,
    animateButtonPress: navButtonPress
  } = useNavigation(animValues, navigation);
  
  // Hook para gerenciar doações
  const {
    donations,
    isLoading,
    selectedDonation,
    isDetailsModalVisible,
    isDeleteModalVisible,
    isEditModalVisible,
    loadDonations,
    handleViewDetails,
    handleCloseDetails,
    handleEditDonation,
    handleCloseEditModal,
    handleSaveEdit,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleConfirmDelete
  } = useDonations();

  // Carregar doações quando o componente for montado
  useEffect(() => {
    loadDonations();
  }, []);
  
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
      
      // Animar grid e cards após um pequeno delay
      setTimeout(() => {
        animateGrid();
        animateCards();
      }, 200);
      
      // Animar navbar
      animateNavBar();
      
      // Animar cada partícula
      [...backgroundParticles, ...middleParticles, ...foregroundParticles]
        .forEach(animateParticle);
    };
    
    initAnimations();
  }, []);
  
  // Manipular botão "Criar Doação"
  const handleAddButtonPress = () => {
    animateButtonPress(animValues.backButtonScale);
    setTimeout(() => {
      handleCreateDonation();
    }, 150);
  };
  
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
            <MyDonationsTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Grade de doações */}
          <View style={styles.mainContent}>
            <DonationsGrid
              donations={donations}
              isLoading={isLoading}
              onViewDetails={handleViewDetails}
              gridOpacity={animValues.gridOpacity}
              gridTranslateY={animValues.gridTranslateY}
              cardOpacity={animValues.cardOpacity}
              cardScale={animValues.cardScale}
            />
          </View>
          
          {/* Botão flutuante para criar nova doação */}
          <View style={styles.createButtonContainer}>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleAddButtonPress}
              activeOpacity={0.8}
            >
              <View style={styles.createButtonInner}>
                <Ionicons name="add" size={32} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Modais */}
        <DonationDetailsModal
          isVisible={isDetailsModalVisible}
          donation={selectedDonation}
          onClose={handleCloseDetails}
          onEdit={handleEditDonation}
          onDelete={handleDeleteConfirmation}
        />
        
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        
        <EditDonationModal
          isVisible={isEditModalVisible}
          donation={selectedDonation}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
        
        {/* Barra de navegação inferior global - posicionada igual à tela Profile */}
        <GlobalFooter
          activeScreen="donations"
          navigation={navigation}
          opacity={animValues.navBarOpacity}
        />
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar 
        onBack={handleBack}
        navBarOpacity={animValues.navBarOpacity}
        backButtonScale={animValues.backButtonScale}
      />
    </View>
  );
};

export default MyDonationsScreen; 