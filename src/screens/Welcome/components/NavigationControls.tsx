import React from 'react';
import { StyleSheet, Animated, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationControlsProps } from '../types';

const NavigationControls: React.FC<NavigationControlsProps> = ({
  buttonOpacity,
  buttonTranslateY,
  buttonScale,
  buttonPulse,
  pageIndicatorsOpacity,
  onNext
}) => {
  return (
    <View style={styles.navigationSection}>
      {/* Botão de Próximo */}
      <Animated.View
        style={{
          opacity: buttonOpacity,
          transform: [
            { translateY: buttonTranslateY },
            { scale: buttonScale },
            { translateY: -30 } // Movendo o botão 30 pixels para cima
          ]
        }}
      >
        {/* Efeito de pulso animado */}
        <Animated.View
          style={[
            styles.pulseEffect,
            {
              opacity: buttonPulse.interpolate({
                inputRange: [0, 0.2, 1],
                outputRange: [0, 0.7, 0]
              }),
              transform: [
                {
                  scale: buttonPulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5]
                  })
                }
              ]
            }
          ]}
        />
        
        <TouchableOpacity 
          style={styles.nextButtonContainer}
          activeOpacity={0.85}
          onPress={onNext}
        >
          <LinearGradient
            colors={['#FF8008', '#FFC837', '#FF8008']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButton}
            locations={[0, 0.5, 1]} // Distribuição mais precisa das cores
          >
            <Text style={styles.nextButtonText}>PRÓXIMO</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Indicadores de página - também movidos para cima */}
      <Animated.View 
        style={[
          styles.pageIndicators,
          { 
            opacity: pageIndicatorsOpacity,
            transform: [{ translateY: -25 }] // Movendo os indicadores também
          }
        ]}
      >
        <View style={styles.pageIndicatorActive} />
        <View style={styles.pageIndicator} />
        <View style={styles.pageIndicator} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationSection: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 30,
    marginTop: 40,
  },
  nextButtonContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2000,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 204, 0, 0.3)',
    zIndex: 10,
  },
  nextButton: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 1.0)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  pageIndicatorActive: {
    width: 25,
    height: 6,
    backgroundColor: '#FF9800',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  pageIndicator: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  pulseEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 30,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    zIndex: 5,
  },
});

export default NavigationControls; 