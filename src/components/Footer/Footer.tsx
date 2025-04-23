import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SideMenu from './SideMenu';
import { logout } from '../../services/authService';

interface FooterProps {
  activeScreen: 'menu' | 'profile' | 'donations' | 'team';
  navigation: any;
  opacity?: Animated.Value;
}

/**
 * Componente de Footer reutilizável para todas as telas
 */
const Footer: React.FC<FooterProps> = ({
  activeScreen,
  navigation,
  opacity = new Animated.Value(1)
}) => {
  // Estado para controlar a visibilidade do menu lateral
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  
  // Estados para animação dos botões
  const menuScale = React.useRef(new Animated.Value(activeScreen === 'menu' ? 1.1 : 1)).current;
  const profileScale = React.useRef(new Animated.Value(activeScreen === 'profile' ? 1.1 : 1)).current;
  const donationsScale = React.useRef(new Animated.Value(activeScreen === 'donations' ? 1.1 : 1)).current;
  const teamScale = React.useRef(new Animated.Value(activeScreen === 'team' ? 1.1 : 1)).current;

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
      // Navegar para a tela de Perfil
      if (activeScreen !== 'profile') {
        navigation.navigate('Profile');
      }
    });
  };

  const handleDonationsPress = () => {
    animateButtonPress(donationsScale, () => {
      // Navegar para a tela de Doações
      if (activeScreen !== 'donations') {
        navigation.navigate('DonationsFeed');
      }
    });
  };

  const handleTeamPress = () => {
    animateButtonPress(teamScale, () => {
      // Navegar para a tela de Time
      if (activeScreen !== 'team') {
        navigation.navigate('Team');
      }
    });
  };
  
  // Função para navegar entre as telas pelo menu lateral
  const handleSideMenuNavigation = (screen: string) => {
    // Navegar para a tela selecionada
    if (screen) {
      navigation.navigate(screen);
    }
    // Fechar o menu
    setIsSideMenuVisible(false);
  };
  
  // Função para fazer logout
  const handleLogout = async () => {
    try {
      console.log("Iniciando processo de logout...");
      
      // Chamar a função de logout do serviço de autenticação
      await logout();
      
      console.log("Logout concluído. Redirecionando para tela de login...");
      // Navegar para a tela de login após o logout
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      // Em caso de erro, navegar para login mesmo assim
      navigation.navigate('Login');
    }
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
      <Animated.View style={[styles.container, { opacity }]}>
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.buttonContainer}>
            {/* Botão Menu */}
            <Animated.View style={{ transform: [{ scale: menuScale }] }}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleMenuPress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name="menu-outline" 
                  size={24} 
                  color={activeScreen === 'menu' ? '#12B05B' : 'rgba(255, 255, 255, 0.8)'} 
                />
                <Text 
                  style={[
                    styles.navButtonText, 
                    activeScreen === 'menu' && styles.activeButtonText
                  ]}
                >
                  Menu
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Botão Perfil */}
            <Animated.View style={{ transform: [{ scale: profileScale }] }}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleProfilePress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={activeScreen === 'profile' ? 'person' : 'person-outline'} 
                  size={24} 
                  color={activeScreen === 'profile' ? '#12B05B' : 'rgba(255, 255, 255, 0.8)'} 
                />
                <Text 
                  style={[
                    styles.navButtonText, 
                    activeScreen === 'profile' && styles.activeButtonText
                  ]}
                >
                  Perfil
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Botão Doações */}
            <Animated.View style={{ transform: [{ scale: donationsScale }] }}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleDonationsPress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={activeScreen === 'donations' ? 'gift' : 'gift-outline'} 
                  size={24} 
                  color={activeScreen === 'donations' ? '#12B05B' : 'rgba(255, 255, 255, 0.8)'} 
                />
                <Text 
                  style={[
                    styles.navButtonText, 
                    activeScreen === 'donations' && styles.activeButtonText
                  ]}
                >
                  Doações
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Botão Time */}
            <Animated.View style={{ transform: [{ scale: teamScale }] }}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={handleTeamPress}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={activeScreen === 'team' ? 'people' : 'people-outline'} 
                  size={24} 
                  color={activeScreen === 'team' ? '#12B05B' : 'rgba(255, 255, 255, 0.8)'} 
                />
                <Text 
                  style={[
                    styles.navButtonText, 
                    activeScreen === 'team' && styles.activeButtonText
                  ]}
                >
                  Time
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </LinearGradient>
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
    height: 60,
    zIndex: 100,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
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
  activeButtonText: {
    color: '#12B05B',
    fontWeight: 'bold',
  },
});

export default Footer; 