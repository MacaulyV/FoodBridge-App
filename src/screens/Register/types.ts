import { Animated } from 'react-native';

// Tipo para indicar se o usuário será doador ou receptor
export type UserType = 'donor' | 'receiver';

// Props para navegação
export interface NavigationProps {
  navigation: any;
  route: {
    params: {
      userType: UserType;
    };
  };
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
  initialY: number;
  initialScale: number;
}

// Props para o componente NavBar
export interface NavBarProps {
  onBack: () => void;
}

// Props para o componente de título da tela
export interface RegisterTitleProps {
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

// Props para o SelectInput
export interface SelectInputProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  opacity: Animated.Value;
  translateY: Animated.Value;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

// Props para o RegisterForm
export interface RegisterFormProps {
  userType: UserType;
  inputsOpacity: Animated.Value[];
  inputsTranslateY: Animated.Value[];
  onRegister: (formData: RegisterFormData) => void;
  buttonOpacity: Animated.Value;
  buttonScale: Animated.Value;
  isLoading?: boolean;
}

// Dados do formulário de registro
export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  city: string;
  district: string;
  
  // Campos específicos para doador
  donorType?: 'individual' | 'business';
  
  // Campos específicos para receptor
  receiverType?: 'individual' | 'ngo';
}

// Erros do formulário
export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  city?: string;
  district?: string;
  donorType?: string;
  receiverType?: string;
}

// Campos tocados
export interface TouchedFields {
  fullName?: boolean;
  email?: boolean;
  password?: boolean;
  city?: boolean;
  district?: boolean;
  donorType?: boolean;
  receiverType?: boolean;
} 