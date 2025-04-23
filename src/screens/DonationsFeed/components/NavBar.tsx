import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NavBarProps {
  navBarOpacity?: Animated.Value;
}

const NavBar: React.FC<NavBarProps> = ({ 
  navBarOpacity = new Animated.Value(1) as any 
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
    justifyContent: 'center',
    height: 50,
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