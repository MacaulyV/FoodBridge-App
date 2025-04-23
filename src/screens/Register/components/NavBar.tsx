import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavBarProps } from '../types';
import { useBackButtonAnimation } from '../hooks/useBackButtonAnimation';

/**
 * Componente da barra de navegação personalizada para a tela Register
 * Usando o mesmo gradiente padronizado em todas as telas
 */
const NavBar: React.FC<NavBarProps> = ({ onBack }) => {
  // Usar o hook de animação para o botão voltar
  const { backButtonScale, animatePress } = useBackButtonAnimation();
  
  // Função para lidar com o clique no botão voltar com animação
  const handleBackPress = () => {
    animatePress(onBack);
  };

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
            {/* Espaçador para mover logo e título para a direita */}
            <View style={styles.leftSpacer} />
            
            <TouchableOpacity onPress={handleBackPress} style={styles.buttonWrapper}>
              <Image
                source={require('../../../../assets/icons/Logo-Vazio.png')}
                style={styles.logoIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text>
                <Text style={styles.foodText}>Food</Text>
                <Text style={styles.bridgeText}>Bridge</Text>
              </Text>
            </View>
          </View>
          
          {/* Botão Voltar à direita com animação */}
          <Animated.View style={{ transform: [{ scale: backButtonScale }] }}>
            <TouchableOpacity 
              onPress={handleBackPress} 
              style={styles.backButtonContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </Animated.View>
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
  leftSpacer: {
    width: 40, // Espaçador à esquerda para mover o logo e título para a direita
  },
  buttonWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Aproxima o logo do título
  },
  logoIcon: {
    width: 35, // Logo aumentado conforme solicitado
    height: 35, // Logo aumentado conforme solicitado
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
  },
  backButtonContainer: {
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  }
});

export default NavBar; 