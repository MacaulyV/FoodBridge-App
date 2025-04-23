import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DeleteConfirmationModalProps } from '../types';

/**
 * Modal para confirmar a exclusão da conta
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirmDelete
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="warning" size={50} color="#E74C3C" />
          </View>
          
          <Text style={styles.modalTitle}>Excluir Conta</Text>
          
          <Text style={styles.deleteWarningText}>
            Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.
          </Text>
          
          <Text style={styles.deleteDetailsText}>
            Ao confirmar, todos os seus dados serão excluídos permanentemente do nosso sistema, incluindo:
          </Text>
          
          <View style={styles.bulletPointsContainer}>
            <Text style={styles.bulletPoint}>• Seus dados pessoais</Text>
            <Text style={styles.bulletPoint}>• Seu histórico de doações</Text>
            <Text style={styles.bulletPoint}>• Imagem de perfil</Text>
          </View>
          
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmDeleteButton]}
              onPress={onConfirmDelete}
            >
              <Text style={styles.confirmButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#191919',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  deleteWarningText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  deleteDetailsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  bulletPointsContainer: {
    marginBottom: 20,
  },
  bulletPoint: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  confirmDeleteButton: {
    backgroundColor: '#E74C3C',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeleteConfirmationModal; 