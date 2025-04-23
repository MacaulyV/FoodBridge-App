import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface BottomNavBarProps {
  navBarOpacity: Animated.Value;
  navigation: any;
}

/**
 * Componente para a barra de navegação inferior da tela DonateFood
 * seguindo o mesmo padrão de outras telas do app.
 */
const BottomNavBar: React.FC<BottomNavBarProps> = ({
  navBarOpacity,
  navigation,
}) => {
  // Estados para animação dos botões
  const menuScale = useRef(new Animated.Value(1)).current;
  const profileScale = useRef(new Animated.Value(1)).current;
  const donationsScale = useRef(new Animated.Value(1.1)).current;
  const teamScale = useRef(new Animated.Value(1)).current;

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
      // Navegar para a tela de Menu (quando implementada)
      console.log("Menu - a ser implementado");
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
      // Já estamos na tela de Doações, não precisa navegar
      console.log("Já estamos na tela Doações");
    });
  };

  const handleTeamPress = () => {
    animateButtonPress(teamScale, () => {
      // Navegar para a tela Team
      navigation.navigate('Team');
    });
  };

  return (
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

      {/* Botão Doações (ativo) */}
      <Animated.View style={{ transform: [{ scale: donationsScale }] }}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleDonationsPress}
          activeOpacity={0.7}
        >
          <Ionicons name="gift" size={24} color="#FF9800" />
          <Text style={[styles.navButtonText, { color: '#FF9800', fontWeight: 'bold' }]}>Doações</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Botão Time */}
      <Animated.View style={{ transform: [{ scale: teamScale }] }}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleTeamPress}
          activeOpacity={0.7}
        >
          <Ionicons name="people-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.navButtonText}>Time</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
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
});

export default BottomNavBar;