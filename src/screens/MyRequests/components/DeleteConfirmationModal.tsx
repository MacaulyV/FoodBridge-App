import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { DeleteConfirmationModalProps } from '../types';

/**
 * Modal para confirmar a exclusão de uma solicitação
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  request,
  onClose,
  onConfirmDelete
}) => {
  if (!request) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={30} style={styles.modalBackground} tint="dark">
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['rgba(20, 30, 50, 0.95)', 'rgba(10, 17, 30, 0.98)']}
            style={styles.modalGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          
          {/* Ícone de alerta */}
          <View style={styles.alertIconContainer}>
            <Ionicons name="alert-circle" size={60} color="#DC3545" />
          </View>
          
          {/* Título */}
          <Text style={styles.title}>Cancelar Solicitação</Text>
          
          {/* Mensagem */}
          <Text style={styles.message}>
            Tem certeza que deseja cancelar sua solicitação para esta doação?
          </Text>
          
          {/* Informações da solicitação */}
          <View style={styles.requestInfoContainer}>
            <Text style={styles.requestName} numberOfLines={1} ellipsizeMode="tail">
              {request.donation?.NOME_ALIMENTO || 'Doação não disponível'}
            </Text>
            <Text style={styles.requestDate}>
              Solicitado em: {new Date(request.DATA_SOLICITACAO).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          
          {/* Nota importante */}
          <Text style={styles.noteText}>
            Essa ação irá cancelar definitivamente sua solicitação de doação. O doador será notificado que você já não tem mais interesse nesta doação.
          </Text>
          
          {/* Botões */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onConfirmDelete(request)}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={18} color="white" />
              <Text style={styles.deleteButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  modalGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  alertIconContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  requestInfoContainer: {
    backgroundColor: 'rgba(20, 40, 70, 0.5)',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(71, 131, 192, 0.2)',
  },
  requestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  requestDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  noteText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(71, 131, 192, 0.2)',
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(71, 131, 192, 0.4)',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 53, 69, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DeleteConfirmationModal; 