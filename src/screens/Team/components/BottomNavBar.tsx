import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavBarProps } from '../types';
import SideMenu from '../../../components/Footer/SideMenu';

/**
 * Componente para a barra de navegação inferior
 */
const BottomNavBar: React.FC<BottomNavBarProps> = ({
  navBarOpacity,
  navigation,
}) => {
  // Estado para controlar a visibilidade do menu lateral
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  
  // Estados para animação dos botões
  const menuScale = React.useRef(new Animated.Value(1)).current;
  const profileScale = React.useRef(new Animated.Value(1)).current;
  const donationsScale = React.useRef(new Animated.Value(1)).current;
  const teamScale = React.useRef(new Animated.Value(1.1)).current;

  // Função para animar o pressionamento do botão
  const animateButtonPress = (buttonScale: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  // Handlers para cada botão
  const handleMenuPress = () => {
    animateButtonPress(menuScale, () => {
      // Abrir o menu lateral
      setIsSideMenuVisible(true);
    });
  };

  const handleProfilePress = () => {
    animateButtonPress(profileScale, () => {
      // Navegar para a tela de Perfil (quando implementada)
      console.log("Perfil - a ser implementado");
    });
  };

  const handleDonationsPress = () => {
    animateButtonPress(donationsScale, () => {
      // Navegar para a tela de Doações (quando implementada)
      console.log("Doações - a ser implementado");
    });
  };

  const handleTeamPress = () => {
    animateButtonPress(teamScale, () => {
      // Já estamos na tela de Time, não precisa navegar
      console.log("Já estamos na tela Time");
    });
  };
  
  // Função para navegar entre as telas pelo menu lateral
  const handleSideMenuNavigation = (screen: string) => {
    // Aqui teríamos a lógica para navegar entre as telas
    console.log(`Navegando para: ${screen}`);
    
    // Podemos implementar a navegação quando as telas estiverem disponíveis
    // Ex: navigation.navigate(screen);
    
    // Por enquanto apenas fechamos o menu e logamos
    setIsSideMenuVisible(false);
  };
  
  // Função para fazer logout
  const handleLogout = () => {
    console.log("Logout realizado");
    // Implementar a lógica de logout quando o sistema de autenticação estiver pronto
    // Ex: AuthService.logout();
  };

  return (
    <>
      {/* Menu Lateral */}
      <SideMenu 
        isVisible={isSideMenuVisible} 
        onClose={() => setIsSideMenuVisible(false)} 
        onNavigate={handleSideMenuNavigation}
        onLogout={handleLogout}
      />
      
      {/* Barra de Navegação Inferior */}
      <Animated.View style={[styles.container, { opacity: navBarOpacity }]}>
        {/* Botão Menu */}
        <Animated.View style={{ transform: [{ scale: menuScale }] }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleMenuPress}
            activeOpacity={0.7}
          >
            <Ionicons name="menu-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.navButtonText}>Menu</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botão Perfil */}
        <Animated.View style={{ transform: [{ scale: profileScale }] }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleProfilePress}
            activeOpacity={0.7}
          >
            <Ionicons name="person-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.navButtonText}>Perfil</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botão Doações */}
        <Animated.View style={{ transform: [{ scale: donationsScale }] }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleDonationsPress}
            activeOpacity={0.7}
          >
            <Ionicons name="gift-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.navButtonText}>Doações</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Botão Time (ativo) */}
        <Animated.View style={{ transform: [{ scale: teamScale }] }}>
          <TouchableOpacity
            style={[styles.navButton, styles.activeNavButton]}
            onPress={handleTeamPress}
            activeOpacity={0.7}
          >
            <Ionicons name="people" size={24} color="#12B05B" />
            <Text style={[styles.navButtonText, { color: '#12B05B', fontWeight: 'bold' }]}>Time</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(25, 25, 25, 0.9)',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 100,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  activeNavButton: {
    opacity: 1,
  },
});

export default BottomNavBar; 