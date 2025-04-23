import { Animated } from 'react-native';

// Tipos para as partículas
export interface ParticleData {
  opacity: Animated.Value;
  translateX: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.Value;
  rotate: Animated.Value;
  type: 'circle' | 'star' | 'dot';
  speedFactor: number;
  opacityFactor: number;
  delay: number;
  duration: number;
}

// Tipo para o start e end point do gradiente
export interface GradientPoint {
  x: number;
  y: number;
}

// Propriedades para navegação
export interface NavigationProps {
  navigation: any;
  route?: {
    params?: {
      isReturning?: boolean;
      fromDirection?: 'left' | 'right';
      skipAnimation?: boolean;
    };
  };
}

// Props para o componente AnimatedLogo
export interface AnimatedLogoProps {
  logoOpacity: Animated.Value;
  mainScale: Animated.Value;
  logoRotate: Animated.Value;
  borderProgress: Animated.Value;
  circleGlow: Animated.Value;
}

// Props para o componente ParticleSystem
export interface ParticleSystemProps {
  backgroundParticles: ParticleData[];
  middleParticles: ParticleData[];
  foregroundParticles: ParticleData[];
}

// Props para o componente WelcomeTitle
export interface WelcomeTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
  subtitleOpacity: Animated.Value;
  subtitleTranslateY: Animated.Value;
}

// Props para o componente NavigationControls
export interface NavigationControlsProps {
  buttonOpacity: Animated.Value;
  buttonTranslateY: Animated.Value;
  buttonScale: Animated.Value;
  buttonPulse: Animated.Value;
  pageIndicatorsOpacity: Animated.Value;
  onNext: () => void;
}

// Props para o componente GradientBackground
export interface GradientBackgroundProps {
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
} 