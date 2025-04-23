import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

export type NavigationProps = StackScreenProps<RootStackParamList, 'MyDonations'>;

export interface Donation {
  ID: string;
  NOME_ALIMENTO: string;
  VALIDADE: string;
  DESCRICAO?: string;
  BAIRRO_OU_DISTRITO: string;
  HORARIO_PREFERIDO?: string;
  imagens_urls?: string[];
  imagens_ids?: string[]; // IDs das imagens para possível exclusão
}

export interface DonationCardProps {
  donation: Donation;
  onViewDetails: (donation: Donation) => void;
  cardOpacity: any; // Animated.Value
  cardScale: any; // Animated.Value
}

export interface DonationDetailsModalProps {
  isVisible: boolean;
  donation: Donation | null;
  onClose: () => void;
  onEdit: (donation: Donation) => void;
  onDelete: (donation: Donation) => void;
}

export interface EditDonationModalProps {
  isVisible: boolean;
  donation: Donation | null;
  onClose: () => void;
  onSave: (formData: EditDonationFormData) => void;
}

export interface EditDonationFormData {
  id: string;
  foodName: string;
  expirationDate: Date;
  description: string;
  district: string;
  preferredPickupTime: string;
  termsAccepted: boolean;
  images: string[]; // Lista de URIs de imagens
  imagesToDelete: string[]; // Lista de IDs de imagens a serem removidas
} 