import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavBarProps } from '../types';

/**
 * Componente da barra de navegação personalizada para a tela Login
 * Usando o mesmo gradiente padronizado em todas as telas
 */
const NavBar: React.FC<NavBarProps> = ({ onBack }) => {
  return (
    <View style={styles.navBarContainer}>
      {/* Fundo sólido preto sob a navbar */}
      <View style={styles.solidBackground} />
      
      {/* Gradiente da navbar - usando o mesmo gradiente do fundo */}
      <LinearGradient
        colors={['#070F1B', '#0D1723', '#182B3A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.navContent}>
          {/* Container do logo e título agrupados */}
          <View style={styles.logoTitleContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../../../assets/icons/Logo-Vazio.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.titleContainer}>
              <Text>
                <Text style={styles.foodText}>Food</Text>
                <Text style={styles.bridgeText}>Bridge</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999, // Aumentado para garantir que fique acima de tudo
  },
  solidBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 120 : 100,
    backgroundColor: '#000000',
  },
  gradientBackground: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 44 : 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 15,
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Aproxima o logo do título
  },
  logoIcon: {
    width: 35,
    height: 35,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodText: {
    color: '#FF9800',
    fontSize: 22,
  },
  bridgeText: {
    color: '#12B05B',
    fontSize: 22,
  }
});

export default NavBar; 