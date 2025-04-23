import { Animated } from 'react-native';

// Propriedades para navegação
export interface NavigationProps {
  navigation: any;
}

// Props para o componente GradientBackground (reutilizado das outras telas)
export interface GradientBackgroundProps {
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
}

// Props para o componente ParticleSystem (reutilizado das outras telas)
export interface ParticleSystemProps {
  backgroundParticles: ParticleData[];
  middleParticles: ParticleData[];
  foregroundParticles: ParticleData[];
}

// Tipos para as partículas (reutilizado das outras telas)
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

// Props para o componente LoginTitle
export interface LoginTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

// Props para o FormInput
export interface FormInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  opacity: Animated.Value;
  translateY: Animated.Value;
  icon?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

// Props para o LoginForm
export interface LoginFormProps {
  inputsOpacity: Animated.Value[];
  inputsTranslateY: Animated.Value[];
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  buttonOpacity: Animated.Value;
  buttonScale: Animated.Value;
  socialButtonsOpacity: Animated.Value;
  socialButtonsTranslateY: Animated.Value;
  footerOpacity: Animated.Value;
}

// Dados do formulário de login
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Erros do formulário
export interface FormErrors {
  email?: string;
  password?: string;
}

// Campos tocados
export interface TouchedFields {
  email?: boolean;
  password?: boolean;
} 