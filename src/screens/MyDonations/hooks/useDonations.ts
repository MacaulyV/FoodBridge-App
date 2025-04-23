import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUserDonations, deleteDonation, updateDonation } from '../../../services/donationService';
import { Donation } from '../types';
import { EditDonationFormData } from '../types';

/**
 * Hook para gerenciar as doações do usuário
 */
export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Carregar as doações do usuário
  const loadDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDonations = await getUserDonations();
      
      if (userDonations && userDonations.length > 0) {
        console.log('✅ [MYDONATIONS] Doações carregadas:', userDonations.length);
        setDonations(userDonations);
      } else {
        console.log('ℹ️ [MYDONATIONS] Nenhuma doação encontrada');
        setDonations([]);
      }
    } catch (error) {
      console.error('❌ [MYDONATIONS] Erro ao carregar doações:', error);
      Alert.alert('Erro', 'Não foi possível carregar suas doações. Tente novamente.');
      setDonations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Abrir modal de detalhes da doação
  const handleViewDetails = useCallback((donation: Donation) => {
    setSelectedDonation(donation);
    setIsDetailsModalVisible(true);
  }, []);

  // Fechar modal de detalhes da doação
  const handleCloseDetails = useCallback(() => {
    setIsDetailsModalVisible(false);
    setTimeout(() => setSelectedDonation(null), 300); // Limpar somente após a animação de fechamento
  }, []);

  // Abrir modal de edição de doação
  const handleEditDonation = useCallback((donation: Donation) => {
    setSelectedDonation(donation);
    setIsDetailsModalVisible(false);
    
    // Pequeno delay para evitar problemas visuais com a transição de modais
    setTimeout(() => {
      setIsEditModalVisible(true);
    }, 300);
    
    console.log('🖊️ [MYDONATIONS] Editar doação:', donation.ID);
  }, []);
  
  // Fechar modal de edição
  const handleCloseEditModal = useCallback(() => {
    setIsEditModalVisible(false);
    setTimeout(() => setSelectedDonation(null), 300);
  }, []);
  
  // Salvar a edição da doação
  const handleSaveEdit = useCallback(async (formData: EditDonationFormData) => {
    setIsLoading(true);
    
    try {
      console.log('🖊️ [MYDONATIONS] Salvando edição da doação:', formData.id);
      
      // Chamar API para atualizar a doação
      await updateDonation(formData.id, {
        foodName: formData.foodName,
        expirationDate: formData.expirationDate,
        description: formData.description,
        district: formData.district,
        preferredPickupTime: formData.preferredPickupTime,
        termsAccepted: formData.termsAccepted,
        images: formData.images,
        imagesToDelete: formData.imagesToDelete
      });
      
      // Recarregar as doações após a atualização
      await loadDonations();
      
      Alert.alert('Sucesso', 'Doação atualizada com sucesso!');
    } catch (error) {
      console.error('❌ [MYDONATIONS] Erro ao atualizar doação:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a doação. Tente novamente.');
    } finally {
      setIsLoading(false);
      setIsEditModalVisible(false);
      setSelectedDonation(null);
    }
  }, [loadDonations]);

  // Abrir modal de confirmação de exclusão
  const handleDeleteConfirmation = useCallback((donation: Donation) => {
    setSelectedDonation(donation);
    setIsDetailsModalVisible(false);
    setTimeout(() => setIsDeleteModalVisible(true), 300);
  }, []);

  // Cancelar exclusão
  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  // Confirmar e executar exclusão
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedDonation) return;
    
    setIsDeleteModalVisible(false);
    setIsLoading(true);
    
    try {
      // Chamar a API para deletar a doação
      await deleteDonation(selectedDonation.ID);
      console.log('🗑️ [MYDONATIONS] Doação deletada:', selectedDonation.ID);
      
      // Atualizar a lista removendo o item deletado
      setDonations(prevDonations => 
        prevDonations.filter(item => item.ID !== selectedDonation.ID)
      );
      
      Alert.alert('Sucesso', 'Doação removida com sucesso.');
    } catch (error) {
      console.error('❌ [MYDONATIONS] Erro ao deletar doação:', error);
      Alert.alert('Erro', 'Não foi possível remover a doação. Tente novamente.');
    } finally {
      setIsLoading(false);
      setSelectedDonation(null);
    }
  }, [selectedDonation]);

  return {
    donations,
    isLoading,
    selectedDonation,
    isDetailsModalVisible,
    isDeleteModalVisible,
    isEditModalVisible,
    loadDonations,
    handleViewDetails,
    handleCloseDetails,
    handleEditDonation,
    handleCloseEditModal,
    handleSaveEdit,
    handleDeleteConfirmation,
    handleCancelDelete,
    handleConfirmDelete
  };
}; 