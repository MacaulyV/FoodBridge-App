import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DonationRequest } from '../types';
import { getUserData } from '../../../services/userService';

/**
 * Hook para gerenciar solicitações de doações
 */
export const useRequests = () => {
  // Estado para armazenar as solicitações
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para controlar modais
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Carregar solicitações do usuário atual
  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      // Obter dados do usuário logado
      const userData = await getUserData();
      
      if (!userData || !userData.id) {
        console.error('❌ [MY_REQUESTS] Nenhum usuário autenticado encontrado');
        setIsLoading(false);
        return;
      }
      
      console.log('🔄 [MY_REQUESTS] Carregando solicitações para o usuário:', userData.id);
      
      // TODO: Substituir com chamada real à API
      // Simulando chamada à API com dados de exemplo
      const mockRequests: DonationRequest[] = await getMockRequests(userData.id);
      
      console.log(`✅ [MY_REQUESTS] ${mockRequests.length} solicitações carregadas`);
      
      // Ordenar do mais recente para o mais antigo
      mockRequests.sort((a, b) => {
        return new Date(b.DATA_SOLICITACAO).getTime() - new Date(a.DATA_SOLICITACAO).getTime();
      });
      
      setRequests(mockRequests);
    } catch (error) {
      console.error('❌ [MY_REQUESTS] Erro ao carregar solicitações:', error);
      Alert.alert('Erro', 'Não foi possível carregar suas solicitações. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carregar solicitações quando o componente for montado
  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Abrir modal de detalhes da solicitação
  const handleViewDetails = useCallback((request: DonationRequest) => {
    setSelectedRequest(request);
    setIsDetailsModalVisible(true);
  }, []);

  // Fechar modal de detalhes da solicitação
  const handleCloseDetails = useCallback(() => {
    setIsDetailsModalVisible(false);
    setTimeout(() => setSelectedRequest(null), 300);
  }, []);

  // Abrir modal de confirmação de exclusão
  const handleDeleteConfirmation = useCallback((request: DonationRequest) => {
    setIsDetailsModalVisible(false);
    setTimeout(() => {
      setSelectedRequest(request);
      setIsDeleteModalVisible(true);
    }, 300);
  }, []);

  // Fechar modal de confirmação de exclusão
  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalVisible(false);
    setTimeout(() => setSelectedRequest(null), 300);
  }, []);

  // Confirmar exclusão da solicitação
  const handleConfirmDelete = useCallback(async (request: DonationRequest) => {
    try {
      console.log('🗑️ [MY_REQUESTS] Removendo solicitação:', request.ID);
      
      // TODO: Implementar chamada real à API
      // Por enquanto, apenas remove localmente
      const updatedRequests = requests.filter(r => r.ID !== request.ID);
      setRequests(updatedRequests);
      
      // Atualizar no AsyncStorage para persistir a exclusão
      await AsyncStorage.setItem('@FoodBridge:userRequests', JSON.stringify(updatedRequests));
      console.log('✅ [MY_REQUESTS] Solicitação removida do AsyncStorage');
      
      // Fechar o modal
      setIsDeleteModalVisible(false);
      setTimeout(() => setSelectedRequest(null), 300);
      
      Alert.alert('Sucesso', 'Solicitação removida do histórico com sucesso!');
    } catch (error) {
      console.error('❌ [MY_REQUESTS] Erro ao remover solicitação:', error);
      Alert.alert('Erro', 'Não foi possível remover a solicitação. Tente novamente.');
    }
  }, [requests]);

  // Função auxiliar para gerar dados de exemplo (remover em produção)
  const getMockRequests = async (userId: string): Promise<DonationRequest[]> => {
    // Verificar se já existem dados salvos no AsyncStorage
    const savedRequests = await AsyncStorage.getItem('@FoodBridge:userRequests');
    if (savedRequests) {
      return JSON.parse(savedRequests);
    }
    
    // Criar dados de exemplo
    const mockData: DonationRequest[] = [
      {
        ID: '1',
        DONATION_ID: '101',
        USER_ID: userId,
        STATUS: 'ACEITA',
        DATA_SOLICITACAO: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        donation: {
          ID: '101',
          NOME_ALIMENTO: 'Cesta Básica Completa',
          VALIDADE: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          DESCRICAO: 'Cesta básica completa com arroz, feijão, óleo, açúcar, farinha e outros itens essenciais.',
          BAIRRO_OU_DISTRITO: 'Centro',
          HORARIO_PREFERIDO: 'Das 14h às 18h',
          imagens_urls: ['https://conteudo.imguol.com.br/c/noticias/92/2022/10/31/cesta-basica-alimentos-inflacao-preco-1667245378495_v2_900x506.jpg']
        }
      },
      {
        ID: '2',
        DONATION_ID: '102',
        USER_ID: userId,
        STATUS: 'AGUARDANDO',
        DATA_SOLICITACAO: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        donation: {
          ID: '102',
          NOME_ALIMENTO: 'Leite e Cereais',
          VALIDADE: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          BAIRRO_OU_DISTRITO: 'Boa Viagem',
          HORARIO_PREFERIDO: 'Período da manhã',
          imagens_urls: ['https://conteudo.imguol.com.br/c/entretenimento/c9/2020/12/18/cereais-de-lata-1608305217548_v2_4x3.jpg']
        }
      },
      {
        ID: '3',
        DONATION_ID: '103',
        USER_ID: userId,
        STATUS: 'RECUSADA',
        DATA_SOLICITACAO: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        donation: {
          ID: '103',
          NOME_ALIMENTO: 'Frutas e Verduras',
          VALIDADE: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          DESCRICAO: 'Mix de frutas e verduras da estação, colhidas hoje. Ideal para famílias.',
          BAIRRO_OU_DISTRITO: 'Espinheiro',
          imagens_urls: ['https://img.freepik.com/fotos-premium/fundo-de-alimentos-saudaveis-fotografia-de-alimentos-de-frutas-e-legumes-diferentes_187166-21872.jpg']
        }
      },
      {
        ID: '4',
        DONATION_ID: '104',
        USER_ID: userId,
        STATUS: 'ACEITA',
        DATA_SOLICITACAO: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        donation: {
          ID: '104',
          NOME_ALIMENTO: 'Pães e Massas',
          VALIDADE: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          BAIRRO_OU_DISTRITO: 'Casa Forte',
          HORARIO_PREFERIDO: 'Final da tarde',
          imagens_urls: ['https://midias.agazeta.com.br/2023/04/04/o-consumo-de-paes-e-massas-industrializados-cresceu-entre-os-brasileiros-939180-article.jpg']
        }
      }
    ];
    
    // Salvar no AsyncStorage para uso futuro
    await AsyncStorage.setItem('@FoodBridge:userRequests', JSON.stringify(mockData));
    
    return mockData;
  };

  return {
    requests,
    isLoading,
    selectedRequest,
    isDetailsModalVisible,
    isDeleteModalVisible,
    loadRequests,
    handleViewDetails,
    handleCloseDetails,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleConfirmDelete
  };
}; 