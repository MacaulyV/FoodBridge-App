import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Text,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface NavBarProps {
  onBack: () => void;
  navBarOpacity: Animated.Value;
  navBarBackButtonScale: Animated.Value;
}

/**
 * Barra de navegação superior com logo e botão de voltar
 */
const NavBar: React.FC<NavBarProps> = ({
  onBack,
  navBarOpacity,
  navBarBackButtonScale
}) => {
  return (
    <Animated.View style={[styles.container, { opacity: navBarOpacity }]}>
      <View style={styles.solidBackground} />
      <LinearGradient
        colors={['#070F1B', '#0D1723', '#182B3A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
        locations={[0, 0.5, 1]}
      >
        <View style={styles.navContent}>
          {/* Botão Voltar */}
          <Animated.View style={[styles.backButtonContainer, { transform: [{ scale: navBarBackButtonScale }] }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>

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

          {/* Espaço vazio para equilibrar o layout */}
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  solidBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 110 : 90,
    backgroundColor: '#000000',
  },
  gradientBackground: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 36,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginTop: -1,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 15,
  },
  backButtonContainer: {
    width: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
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
  placeholder: {
    width: 40,
  },
});

export default NavBar; 