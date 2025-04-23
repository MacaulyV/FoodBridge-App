import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationControlsProps } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Componente para os controles de navegação (botão e indicadores de página)
 */
const NavigationControls: React.FC<NavigationControlsProps> = ({
  buttonOpacity,
  buttonScale,
  buttonPulse,
  indicatorsOpacity,
  onNext,
  currentScreen,
}) => {
  // Total de telas no onboarding
  const totalScreens = 3;
  
  // Renderiza os indicadores de página (bolinhas)
  const renderPageIndicators = () => {
    return Array(totalScreens).fill(0).map((_, index) => (
      <View
        key={`indicator-${index}`}
        style={[
          styles.pageIndicator,
          currentScreen === index ? styles.activeIndicator : {}
        ]}
      />
    ));
  };

  // Função para lidar com o clique no botão com animação
  const handleButtonPress = () => {
    // O movimento do botão e a navegação serão gerenciados pelo hook useNavigation
    onNext();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: buttonOpacity }
      ]}
    >
      <View style={styles.controlsRow}>
        {/* Indicadores de página (bolinhas) */}
        <Animated.View
          style={[
            styles.pageIndicatorsContainer,
            { opacity: indicatorsOpacity }
          ]}
        >
          {renderPageIndicators()}
        </Animated.View>
        
        {/* Botão Continuar */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [
                { scale: Animated.multiply(buttonScale, buttonPulse) }
              ]
            }
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleButtonPress}
            style={styles.buttonTouch}
          >
            <LinearGradient
              colors={['#FF9800', '#FF7F50']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  controlsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    maxWidth: 190,
  },
  buttonTouch: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF9800',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default NavigationControls; 