import { Animated } from 'react-native';

// Propriedades para navegação
export interface NavigationProps {
  navigation: any;
}

// Props para o componente GradientBackground (reutilizado do Welcome)
export interface GradientBackgroundProps {
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
}

// Props para o componente ParticleSystem (reutilizado do Welcome)
export interface ParticleSystemProps {
  backgroundParticles: ParticleData[];
  middleParticles: ParticleData[];
  foregroundParticles: ParticleData[];
}

// Tipos para as partículas (reutilizado do Welcome)
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

// Props para o componente IllustrationImage
export interface IllustrationImageProps {
  imageOpacity: Animated.Value;
  imageScale: Animated.Value;
  imageTranslateY: Animated.Value;
}

// Props para o componente ContentSection
export interface ContentSectionProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
  descriptionOpacity: Animated.Value;
  descriptionTranslateY: Animated.Value;
}

// Props para o componente NavigationControls
export interface NavigationControlsProps {
  buttonOpacity: Animated.Value;
  buttonScale: Animated.Value;
  buttonPulse: Animated.Value;
  indicatorsOpacity: Animated.Value;
  onNext: () => void;
  currentScreen: number;
}

// Props para o componente NavBar
export interface NavBarProps {
  onBack: () => void;
} 