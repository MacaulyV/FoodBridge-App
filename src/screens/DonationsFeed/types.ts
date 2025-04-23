import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

export type NavigationProps = StackScreenProps<RootStackParamList, 'DonationsFeed'>;

export interface PublicDonation {
  ID: string;
  NOME_ALIMENTO: string;
  VALIDADE: string;
  DESCRICAO?: string;
  BAIRRO_OU_DISTRITO: string;
  HORARIO_PREFERIDO?: string;
  TERMOS?: string;
  USER_ID: string;
  imagens_urls?: string[];
}

export interface DonationCardProps {
  donation: PublicDonation;
  onViewDetails: (donation: PublicDonation) => void;
  cardOpacity: any; // Animated.Value
  cardScale: any; // Animated.Value
}

export interface DonationDetailsModalProps {
  isVisible: boolean;
  donation: PublicDonation | null;
  onClose: () => void;
  onConfirmRequest: (donation: PublicDonation) => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  barOpacity: any; // Animated.Value
} 