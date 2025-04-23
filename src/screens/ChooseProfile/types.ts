import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

// Props para o componente NavBar
export interface NavBarProps {
  onBack: () => void;
}

// Props para o componente ContentSection
export interface ContentSectionProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

// Tipo para os ícones do Ionicons
export type IoniconName = keyof typeof Ionicons.glyphMap;

// Props para o componente ProfileOption
export interface ProfileOptionProps {
  title: string;
  description: string;
  icon: IoniconName;
  optionOpacity: Animated.Value;
  optionScale: Animated.Value;
  onPress: () => void;
}

// Props para o componente ProfileOptionsContainer
export interface ProfileOptionsContainerProps {
  containerOpacity: Animated.Value;
  containerTranslateY: Animated.Value;
  donateOptionOpacity: Animated.Value;
  donateOptionScale: Animated.Value;
  receiveOptionOpacity: Animated.Value;
  receiveOptionScale: Animated.Value;
  onSelectDonate: () => void;
  onSelectReceive: () => void;
}

// Props para o componente IllustrationImage
export interface IllustrationImageProps {
  imageOpacity: Animated.Value;
  imageScale: Animated.Value;
  imageTranslateY: Animated.Value;
} 