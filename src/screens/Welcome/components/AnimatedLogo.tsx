import React from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedLogoProps } from '../types';

// Cria o componente Circle animado
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  logoOpacity,
  mainScale,
  logoRotate,
  borderProgress,
  circleGlow
}) => {
  // Constantes para o círculo e a borda
  const circleBorderRadius = 150; // Aumentado de 136 para 150
  const circumference = 2 * Math.PI * circleBorderRadius;
  
  // Interpola a animação do progresso da borda
  const strokeDashoffset = borderProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // Modificado para fazer o marcador desaparecer mais cedo no final da animação
  const markerOpacity = borderProgress.interpolate({
    inputRange: [0, 0.90, 0.95, 1],
    outputRange: [1, 1, 0, 0], // Faz o marcador desaparecer quando a borda estiver 95% completa
  });

  // Interpolação para rotação do logo
  const logoRotateValue = logoRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-20deg', '0deg', '20deg']
  });

  // Interpolação para o brilho do círculo
  const circleShadowOpacity = circleGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8]
  });
  
  const circleShadowRadius = circleGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 15]
  });

  return (
    <View style={styles.imageSection}>
      {/* Borda animada */}
      <View style={[styles.borderContainer, { zIndex: 3 }]}>
        {/* Círculo estático de fundo */}
        <View style={styles.staticBorder} />
        
        {/* SVG para a borda progressiva */}
        <Svg width={320} height={320} style={styles.svgContainer}>
          <AnimatedCircle
            cx={160}
            cy={160}
            r={circleBorderRadius}
            stroke="#FF9800"
            strokeWidth={5}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            strokeOpacity={1}
            strokeMiterlimit={10}
          />
        </Svg>
        
        {/* Marcador que se move junto com o progresso da borda */}
        <Animated.View
          style={[
            styles.marker,
            styles.markerPrimary,
            {
              position: 'absolute',
              opacity: markerOpacity,
              transform: [
                { translateX: borderProgress.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [160, 160 + circleBorderRadius, 160, 160 - circleBorderRadius, 160]
                })},
                { translateY: borderProgress.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [160 - circleBorderRadius, 160, 160 + circleBorderRadius, 160, 160 - circleBorderRadius]
                })},
                { translateX: -8 },
                { translateY: -8 },
              ]
            }
          ]}
        />
      </View>
      
      {/* Grupo animado do círculo com gradiente e logo */}
      <Animated.View
        style={[
          styles.logoGroup,
          {
            opacity: logoOpacity,
            transform: [
              { scale: mainScale },
              { rotate: logoRotateValue }
            ],
            zIndex: 2
          }
        ]}
      >
        {/* 
          Círculo de fundo para o logo com o mesmo gradiente das telas
        */}
        <Animated.View 
          style={[
            styles.circleContainer,
            {
              shadowOpacity: circleShadowOpacity,
              shadowRadius: circleShadowRadius
            }
          ]}
        >
          <View style={styles.gradientContainer}>
            {/* Gradiente principal - igual ao usado nas telas */}
            <LinearGradient
              colors={['#070F1B', '#0D1723', '#182B3A']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Gradiente de realce na parte superior */}
            <LinearGradient
              colors={[
                'rgba(2, 22, 43, 0.25)', 
                'transparent'
              ]}
              style={styles.accentGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
            
            {/* Overlay escuro sutil para dar profundidade */}
            <View style={styles.darkOverlay} />
          </View>
        </Animated.View>
        
        {/* Logo central */}
        <Image
          source={require('../../../../assets/icons/Logo-FoodBridge.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    flex: 4.5, // Ajustado para dar mais espaço para a imagem
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 0, // Removida margem desnecessária 
  },
  logoGroup: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  borderContainer: {
    position: 'absolute',
    width: 320,
    height: 320, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  staticBorder: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.05)',
  },
  svgContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    shadowColor: '#FF9800', // Cor laranja para combinar com o tema
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 110,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  accentGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  logo: {
    width: 160,
    height: 160,
    zIndex: 10,
  },
  marker: {
    position: 'absolute',
    backgroundColor: '#FF9800',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  markerPrimary: {
    width: 16,
    height: 16,
    backgroundColor: '#FF9800',
  },
  markerSecondary: {
    width: 10,
    height: 10,
    backgroundColor: '#FFCC80',
  },
});

export default AnimatedLogo; 