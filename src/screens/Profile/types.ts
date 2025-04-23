import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';
import { Animated } from 'react-native';

// Tipos para as props de navegação
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export interface NavigationProps {
  navigation: ProfileScreenNavigationProp;
  route?: any;
}

// Informações do usuário
export interface UserProfile {
  name: string;
  email: string;
  city: string;
  neighborhood: string;
  profileType: 'pessoa_fisica' | 'pessoa_juridica' | 'ong';
  avatar?: string;
}

// Tipos para o componente ProfileHeader
export interface ProfileHeaderProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

// Tipos para o componente ProfileInfo
export interface ProfileInfoProps {
  containerOpacity: Animated.Value;
  containerTranslateY: Animated.Value;
  userProfile: UserProfile;
}

// Tipos para o componente Avatar
export interface AvatarProps {
  source?: string;
  size?: number;
  opacity?: Animated.Value;
  scale?: Animated.Value;
  onPress?: () => void;
  editable?: boolean;
}

// Tipos para o componente ProfileActions
export interface ProfileActionsProps {
  actionsOpacity: Animated.Value;
  actionsTranslateY: Animated.Value;
  onEdit: () => void;
  onDelete: () => void;
}

// Tipos para o componente Footer
export interface FooterProps {
  footerOpacity: Animated.Value;
  footerTranslateY: Animated.Value;
}

// Tipos para o componente EditProfileModal
export interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onProfileUpdated?: (updatedProfile: UserProfile) => void;
}

// Tipos para o componente DeleteConfirmationModal
export interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

// Tipos para o componente AvatarPicker
export interface AvatarPickerProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
} 