import { Animated } from 'react-native';

// Props para navegação
export interface NavigationProps {
  navigation: any;
}

// Props para o componente GradientBackground
export interface GradientBackgroundProps {
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
}

// Props para o componente ParticleSystem
export interface ParticleSystemProps {
  backgroundParticles: ParticleData[];
  middleParticles: ParticleData[];
  foregroundParticles: ParticleData[];
}

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
  initialY: number;
  initialScale: number;
}

// Props para o componente NavBar
export interface NavBarProps {
  onBack: () => void;
}

// Props para o componente de título da tela
export interface DonateFoodTitleProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

// Props para o FormInput
export interface FormInputProps {
  label: string;
  placeholder: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  icon?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
}

// Props para o DatePickerField
export interface DatePickerFieldProps {
  label: string;
  placeholder: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

// Props para o TimePickerField
export interface TimePickerFieldProps {
  label: string;
  placeholder: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  value: string;
  onChange: (time: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

// Props para o CheckboxField
export interface CheckboxFieldProps {
  label: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  value: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  touched?: boolean;
}

// Props para o ImagePickerField
export interface ImagePickerFieldProps {
  label: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  value: string[];
  onChange: (images: string[]) => void;
  error?: string;
  touched?: boolean;
}

// Props para o DonateFoodForm
export interface DonateFoodFormProps {
  inputsOpacity: Animated.Value[];
  inputsTranslateY: Animated.Value[];
  onDonate: (formData: DonationFormData) => void;
  buttonOpacity: Animated.Value;
  buttonScale: Animated.Value;
  isLoading?: boolean;
}

// Dados do formulário de doação
export interface DonationFormData {
  foodName: string;
  expirationDate: Date | null;
  description: string;
  district: string;
  preferredPickupTime: string;
  images: string[];
  termsAccepted: boolean;
}

// Erros do formulário
export interface FormErrors {
  foodName?: string;
  expirationDate?: string;
  description?: string;
  district?: string;
  preferredPickupTime?: string;
  images?: string;
  termsAccepted?: string;
}

// Campos tocados
export interface TouchedFields {
  foodName?: boolean;
  expirationDate?: boolean;
  description?: boolean;
  district?: boolean;
  preferredPickupTime?: boolean;
  images?: boolean;
  termsAccepted?: boolean;
} 