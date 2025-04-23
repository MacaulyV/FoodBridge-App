import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

export type NavigationProps = StackScreenProps<RootStackParamList, 'MyRequests'>;

export interface DonationRequest {
  ID: string;
  DONATION_ID: string;
  USER_ID: string;
  STATUS: 'AGUARDANDO' | 'ACEITA' | 'RECUSADA';
  DATA_SOLICITACAO: string;
  donation?: {
    ID: string;
    NOME_ALIMENTO: string;
    VALIDADE: string;
    DESCRICAO?: string;
    BAIRRO_OU_DISTRITO: string;
    HORARIO_PREFERIDO?: string;
    imagens_urls?: string[];
  };
}

export interface RequestCardProps {
  request: DonationRequest;
  onViewDetails: (request: DonationRequest) => void;
  cardOpacity: any; // Animated.Value
  cardScale: any; // Animated.Value
}

export interface RequestDetailsModalProps {
  isVisible: boolean;
  request: DonationRequest | null;
  onClose: () => void;
  onRemove: (request: DonationRequest) => void;
}

export interface DeleteConfirmationModalProps {
  isVisible: boolean;
  request: DonationRequest | null;
  onClose: () => void;
  onConfirmDelete: (request: DonationRequest) => void;
} 