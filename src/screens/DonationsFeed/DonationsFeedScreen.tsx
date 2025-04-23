import React, { useEffect } from 'react';
import { View, StatusBar, Animated, TextInput } from 'react-native';
import { NavigationProps } from './types';

// Componentes
import {
  GradientBackground,
  NavBar,
  DonationsFeedTitle,
  DonationsGrid,
  DonationDetailsModal,
  SearchBar
} from './components';
import GlobalFooter from '../../components/Footer/Footer';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';
import { useDonationsFeed } from './hooks/useDonationsFeed';

// Estilos
import styles from './styles';

/**
 * Tela de Doações Disponíveis do aplicativo FoodBridge
 */
const DonationsFeedScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // Inicializar todos os valores de animação
  const animValues = useAnimationValues();
  
  // Hooks para gerenciar animações de conteúdo
  const { 
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateSearchBar,
    animateGrid,
    animateCards,
    animateNavBar,
    animateButtonPress
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { 
    handleBack
  } = useNavigation(animValues, navigation);
  
  // Hook para gerenciar doações
  const {
    donations,
    isLoading,
    searchText,
    selectedDonation,
    isDetailsModalVisible,
    filterDonations,
    loadDonations,
    handleViewDetails,
    handleCloseDetails,
    handleConfirmRequest
  } = useDonationsFeed();

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
      
      // Animar conteúdo
      animateTitle();
      animateSearchBar();
      
      // Animar grid e cards após um pequeno delay
      setTimeout(() => {
        animateGrid();
        animateCards();
      }, 200);
      
      // Animar navbar
      animateNavBar();
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
        
        {/* Container principal */}
        <View style={styles.contentContainer}>
          {/* Título da tela */}
          <View style={styles.header}>
            <DonationsFeedTitle
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchText}
              onChangeText={filterDonations}
              placeholder="Buscar por nome ou bairro..."
              barOpacity={animValues.searchBarOpacity}
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
        </View>
        
        {/* Modais */}
        <DonationDetailsModal
          isVisible={isDetailsModalVisible}
          donation={selectedDonation}
          onClose={handleCloseDetails}
          onConfirmRequest={handleConfirmRequest}
        />
        
        {/* Barra de navegação inferior global */}
        <GlobalFooter
          activeScreen="donations"
          navigation={navigation}
          opacity={animValues.navBarOpacity}
        />
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar 
        navBarOpacity={animValues.navBarOpacity}
      />
    </View>
  );
};

export default DonationsFeedScreen; 