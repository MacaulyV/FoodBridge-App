import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Componente da barra de navegação personalizada para a tela Profile,
 * com logo e título centralizados.
 * Usando o mesmo gradiente padronizado em todas as telas.
 */
const NavBar: React.FC = () => {
  return (
    <View style={styles.navBarContainer}>
      {/* Fundo sólido preto sob a navbar */}
      <View style={styles.solidBackground} />

      {/* Gradiente da navbar - usando o mesmo gradiente padronizado */}
      <LinearGradient
        colors={['#070F1B', '#0D1723', '#182B3A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.navContent}>
          {/* Logo e título centralizados */}
          <View style={styles.logoTitleContainer}>
            <Image
              source={require('../../../../assets/icons/Logo-Vazio.png')}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>
              <Text style={styles.foodText}>Food</Text>
              <Text style={styles.bridgeText}>Bridge</Text>
            </Text>
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
    zIndex: 999,
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
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  titleText: {
    flexDirection: 'row',
  },
  foodText: {
    color: '#FF9800',
    fontSize: 22,
  },
  bridgeText: {
    color: '#12B05B',
    fontSize: 22,
  },
});

export default NavBar; 