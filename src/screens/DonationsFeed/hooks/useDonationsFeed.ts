import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { getAllDonations } from '../../../services/donationService';
import { PublicDonation } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../../services/userService';

/**
 * Hook para gerenciar as doações disponíveis
 */
export const useDonationsFeed = () => {
  const [donations, setDonations] = useState<PublicDonation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<PublicDonation[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<PublicDonation | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  
  // Carregar todas as doações disponíveis
  const loadDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const availableDonations = await getAllDonations();
      
      if (availableDonations && availableDonations.length > 0) {
        console.log('✅ [DONATIONS_FEED] Doações carregadas:', availableDonations.length);
        setDonations(availableDonations);
        setFilteredDonations(availableDonations);
      } else {
        console.log('ℹ️ [DONATIONS_FEED] Nenhuma doação encontrada');
        setDonations([]);
        setFilteredDonations([]);
      }
    } catch (error) {
      console.error('❌ [DONATIONS_FEED] Erro ao carregar doações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as doações disponíveis. Tente novamente.');
      setDonations([]);
      setFilteredDonations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrar doações com base no texto de busca
  const filterDonations = useCallback((text: string) => {
    setSearchText(text);
    
    if (!text.trim()) {
      // Se o campo de busca estiver vazio, mostra todas as doações
      setFilteredDonations(donations);
      return;
    }
    
    // Filtrar por nome do alimento, cidade ou bairro
    const filtered = donations.filter(donation => {
      const searchLower = text.toLowerCase();
      
      return (
        donation.NOME_ALIMENTO.toLowerCase().includes(searchLower) ||
        donation.BAIRRO_OU_DISTRITO.toLowerCase().includes(searchLower)
      );
    });
    
    setFilteredDonations(filtered);
  }, [donations]);

  // Carregar doações quando o componente for montado
  useEffect(() => {
    loadDonations();
  }, [loadDonations]);

  // Abrir modal de detalhes da doação
  const handleViewDetails = useCallback((donation: PublicDonation) => {
    setSelectedDonation(donation);
    setIsDetailsModalVisible(true);
  }, []);

  // Fechar modal de detalhes da doação
  const handleCloseDetails = useCallback(() => {
    setIsDetailsModalVisible(false);
    setTimeout(() => setSelectedDonation(null), 300); // Limpar somente após a animação de fechamento
  }, []);
  
  // Confirmar solicitação de doação
  const handleConfirmRequest = useCallback(async (donation: PublicDonation) => {
    try {
      console.log('🤝 [DONATIONS_FEED] Solicitação de doação:', donation.ID);
      
      // Obter dados do usuário logado
      const userData = await getUserData();
      
      if (!userData || !userData.id) {
        console.error('❌ [DONATIONS_FEED] Nenhum usuário autenticado encontrado');
        Alert.alert('Erro', 'É necessário estar logado para solicitar doações.');
        return;
      }
      
      // Verificar se existem solicitações salvas
      const savedRequests = await AsyncStorage.getItem('@FoodBridge:userRequests');
      let requestsArray = savedRequests ? JSON.parse(savedRequests) : [];
      
      // Criar nova solicitação
      const newRequest = {
        ID: Math.floor(Math.random() * 1000000).toString(), // ID temporário
        DONATION_ID: donation.ID,
        USER_ID: userData.id,
        STATUS: 'AGUARDANDO',
        DATA_SOLICITACAO: new Date().toISOString(),
        donation: {
          ID: donation.ID,
          NOME_ALIMENTO: donation.NOME_ALIMENTO,
          VALIDADE: donation.VALIDADE,
          DESCRICAO: donation.DESCRICAO || '',
          BAIRRO_OU_DISTRITO: donation.BAIRRO_OU_DISTRITO,
          HORARIO_PREFERIDO: donation.HORARIO_PREFERIDO || '',
          imagens_urls: donation.imagens_urls
        }
      };
      
      // Adicionar nova solicitação ao array
      requestsArray.push(newRequest);
      
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('@FoodBridge:userRequests', JSON.stringify(requestsArray));
      
      console.log('✅ [DONATIONS_FEED] Solicitação salva com sucesso');
      Alert.alert('Solicitação Enviada', 'Sua solicitação foi enviada com sucesso! O doador entrará em contato.');
      
      setIsDetailsModalVisible(false);
      setTimeout(() => setSelectedDonation(null), 300);
    } catch (error) {
      console.error('❌ [DONATIONS_FEED] Erro ao salvar solicitação:', error);
      Alert.alert('Erro', 'Não foi possível enviar sua solicitação. Tente novamente.');
    }
  }, []);

  return {
    donations: filteredDonations,
    isLoading,
    searchText,
    selectedDonation,
    isDetailsModalVisible,
    loadDonations,
    filterDonations,
    handleViewDetails,
    handleCloseDetails,
    handleConfirmRequest
  };
}; 