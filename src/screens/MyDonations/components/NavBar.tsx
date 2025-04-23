import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Dimensões da tela
const { width } = Dimensions.get('window');

interface NavBarProps {
  onBack: () => void;
  navBarOpacity?: Animated.Value;
  backButtonScale?: Animated.Value;
}

/**
 * Componente de barra de navegação superior com botão voltar e logo
 */
const NavBar: React.FC<NavBarProps> = ({
  onBack,
  navBarOpacity = new Animated.Value(1),
  backButtonScale = new Animated.Value(1)
}) => {
  return (
    <Animated.View style={[styles.container, { opacity: navBarOpacity }]}>
      <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
        <View style={styles.content}>
          {/* Logo centralizado com imagem e texto */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../../assets/icons/Logo-Vazio.png')}
              style={styles.logoIcon} 
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text>
                <Text style={styles.foodText}>Food</Text>
                <Text style={styles.bridgeText}>Bridge</Text>
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40, // Para compensar a barra de status
    zIndex: 100,
  },
  blurContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center', // Centralizar o conteúdo
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centralizar os elementos
  },
  logoIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodText: {
    color: '#FF9800',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bridgeText: {
    color: '#12B05B',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 4,
  }
});

export default NavBar; 